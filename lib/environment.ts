export function isProductionSite() {
  return process.env.VERCEL_ENV === "production";
}
