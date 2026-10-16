const YAW_PER_PIXEL = 0.006;
const ELEVATION_PER_PIXEL = 0.005;
const TOUCH_DECISION_PIXELS = 8;
const HORIZONTAL_DOMINANCE = 1.2;
const SPEED_SMOOTHING = 0.5;
const STALE_RELEASE_MILLISECONDS = 80;

type DragRotationHandlers = {
  onDragStart: () => void;
  onRotate: (yaw: number, elevation: number) => void;
  onDragEnd: (yawSpeed: number) => void;
};

type Gesture = {
  pointerId: number;
  isTouch: boolean;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  yawSpeed: number;
  rotating: boolean;
};

export function observeDragRotation(element: HTMLElement, handlers: DragRotationHandlers): () => void {
  let gesture: Gesture | null = null;

  const beginRotating = (current: Gesture) => {
    current.rotating = true;
    element.setPointerCapture(current.pointerId);
    if (!current.isTouch) element.style.cursor = "grabbing";
    handlers.onDragStart();
  };

  const handleDown = (event: PointerEvent) => {
    if (gesture || (event.pointerType === "mouse" && event.button !== 0)) return;
    gesture = {
      pointerId: event.pointerId,
      isTouch: event.pointerType !== "mouse",
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: event.timeStamp,
      yawSpeed: 0,
      rotating: false,
    };
    if (!gesture.isTouch) beginRotating(gesture);
  };

  const handleMove = (event: PointerEvent) => {
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    if (!gesture.rotating) {
      const totalX = event.clientX - gesture.startX;
      const totalY = event.clientY - gesture.startY;
      if (Math.hypot(totalX, totalY) < TOUCH_DECISION_PIXELS) return;
      if (Math.abs(totalX) < Math.abs(totalY) * HORIZONTAL_DOMINANCE) {
        gesture = null;
        return;
      }
      beginRotating(gesture);
    }
    const deltaX = event.clientX - gesture.lastX;
    const deltaY = event.clientY - gesture.lastY;
    const seconds = Math.max((event.timeStamp - gesture.lastTime) / 1000, 0.001);
    const yaw = -deltaX * YAW_PER_PIXEL;
    gesture.yawSpeed += (yaw / seconds - gesture.yawSpeed) * SPEED_SMOOTHING;
    gesture.lastX = event.clientX;
    gesture.lastY = event.clientY;
    gesture.lastTime = event.timeStamp;
    handlers.onRotate(yaw, gesture.isTouch ? 0 : deltaY * ELEVATION_PER_PIXEL);
  };

  const finish = (event: PointerEvent) => {
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    const finished = gesture;
    gesture = null;
    if (!finished.rotating) return;
    element.style.cursor = "";
    const isStale = event.timeStamp - finished.lastTime > STALE_RELEASE_MILLISECONDS;
    handlers.onDragEnd(event.type === "pointerup" && !isStale ? finished.yawSpeed : 0);
  };

  element.addEventListener("pointerdown", handleDown);
  element.addEventListener("pointermove", handleMove);
  element.addEventListener("pointerup", finish);
  element.addEventListener("pointercancel", finish);

  return () => {
    element.removeEventListener("pointerdown", handleDown);
    element.removeEventListener("pointermove", handleMove);
    element.removeEventListener("pointerup", finish);
    element.removeEventListener("pointercancel", finish);
    element.style.cursor = "";
  };
}
