import {
  DepthTexture,
  HalfFloatType,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget,
  type PerspectiveCamera,
  type Texture,
  type WebGLRenderer,
} from "three";

const FULLSCREEN_VERTEX_SHADER = `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const BLUR_FRAGMENT_SHADER = `
uniform sampler2D tDiffuse;
uniform vec2 dir;
varying vec2 vUv;
void main(){
  vec4 c = texture2D(tDiffuse, vUv) * 0.227027;
  c += texture2D(tDiffuse, vUv + dir * 1.3846) * 0.316216;
  c += texture2D(tDiffuse, vUv - dir * 1.3846) * 0.316216;
  c += texture2D(tDiffuse, vUv + dir * 3.2308) * 0.07027;
  c += texture2D(tDiffuse, vUv - dir * 3.2308) * 0.07027;
  gl_FragColor = c;
}`;

const COMPOSITE_FRAGMENT_SHADER = `
#include <packing>
uniform sampler2D tSharp;
uniform sampler2D tDepth;
uniform sampler2D tBlur;
uniform float near;
uniform float far;
uniform float focus;
uniform float fr;
uniform float nearK;
uniform float bloom;
uniform float thr;
varying vec2 vUv;
void main(){
  vec4 s = texture2D(tSharp, vUv); vec3 b = texture2D(tBlur, vUv).rgb;
  float z = -perspectiveDepthToViewZ(texture2D(tDepth, vUv).x, near, far);
  float cf = smoothstep(focus + fr, focus + fr * 6.0, z) * 0.7 + (1.0 - smoothstep(focus * 0.22, focus * 0.55, z)) * nearK;
  vec3 c = mix(s.rgb, b, clamp(cf, 0.0, 1.0));
  c += max(b - vec3(thr), vec3(0.0)) * bloom;
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

const BLUR_PASSES: [number, number][] = [
  [1.2, 0],
  [0, 1.2],
  [2.4, 0],
  [0, 2.4],
];

export class DepthOfFieldPass {
  private readonly blurMaterial: ShaderMaterial;
  private readonly compositeMaterial: ShaderMaterial;
  private readonly quad: Mesh;
  private readonly quadScene = new Scene();
  private readonly quadCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly sceneTarget: WebGLRenderTarget;
  private readonly pingTarget: WebGLRenderTarget;
  private readonly pongTarget: WebGLRenderTarget;
  private sizeKey = "";
  private blurWidth = 1;
  private blurHeight = 1;

  constructor(private readonly renderer: WebGLRenderer) {
    this.blurMaterial = new ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, dir: { value: new Vector2() } },
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLUR_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    this.compositeMaterial = new ShaderMaterial({
      uniforms: {
        tSharp: { value: null },
        tDepth: { value: null },
        tBlur: { value: null },
        near: { value: 0.3 },
        far: { value: 260 },
        focus: { value: 15 },
        fr: { value: 5 },
        nearK: { value: 0.4 },
        bloom: { value: 0.24 },
        thr: { value: 0.82 },
      },
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: COMPOSITE_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new Mesh(new PlaneGeometry(2, 2), this.blurMaterial);
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);

    this.sceneTarget = new WebGLRenderTarget(4, 4, { type: HalfFloatType, samples: 4 });
    this.sceneTarget.depthTexture = new DepthTexture(4, 4);
    this.pingTarget = new WebGLRenderTarget(4, 4, { type: HalfFloatType });
    this.pongTarget = new WebGLRenderTarget(4, 4, { type: HalfFloatType });
  }

  render(scene: Scene, camera: PerspectiveCamera, width: number, height: number, focusDistance: number) {
    this.resize(width, height);
    const { renderer } = this;

    renderer.setRenderTarget(this.sceneTarget);
    renderer.clear();
    renderer.render(scene, camera);

    this.quad.material = this.blurMaterial;
    this.blurInto(this.pingTarget, this.sceneTarget.texture, ...BLUR_PASSES[0]);
    this.blurInto(this.pongTarget, this.pingTarget.texture, ...BLUR_PASSES[1]);
    this.blurInto(this.pingTarget, this.pongTarget.texture, ...BLUR_PASSES[2]);
    this.blurInto(this.pongTarget, this.pingTarget.texture, ...BLUR_PASSES[3]);

    const uniforms = this.compositeMaterial.uniforms;
    uniforms.tSharp.value = this.sceneTarget.texture;
    uniforms.tDepth.value = this.sceneTarget.depthTexture;
    uniforms.tBlur.value = this.pongTarget.texture;
    uniforms.near.value = camera.near;
    uniforms.far.value = camera.far;
    uniforms.focus.value = focusDistance;
    uniforms.fr.value = focusDistance * 0.3;
    uniforms.nearK.value = 0.15;
    this.quad.material = this.compositeMaterial;
    renderer.setRenderTarget(null);
    renderer.render(this.quadScene, this.quadCamera);
  }

  dispose() {
    this.sceneTarget.dispose();
    this.pingTarget.dispose();
    this.pongTarget.dispose();
    this.blurMaterial.dispose();
    this.compositeMaterial.dispose();
    this.quad.geometry.dispose();
  }

  private blurInto(target: WebGLRenderTarget, source: Texture, directionX: number, directionY: number) {
    this.blurMaterial.uniforms.tDiffuse.value = source;
    this.blurMaterial.uniforms.dir.value.set(directionX / this.blurWidth, directionY / this.blurHeight);
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.quadScene, this.quadCamera);
  }

  private resize(width: number, height: number) {
    const key = `${width}x${height}`;
    if (key === this.sizeKey) return;
    this.sizeKey = key;
    this.sceneTarget.setSize(width, height);
    this.blurWidth = Math.max(1, width >> 2);
    this.blurHeight = Math.max(1, height >> 2);
    this.pingTarget.setSize(this.blurWidth, this.blurHeight);
    this.pongTarget.setSize(this.blurWidth, this.blurHeight);
  }
}
