export function isPreviewDeployment() {
  return process.env.VERCEL_ENV === "preview";
}
