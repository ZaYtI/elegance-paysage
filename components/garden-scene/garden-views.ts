export type GardenView = "creation" | "finished" | "bare" | "terrace" | "planting" | "hedge";

export const gardenStages = [
  "Le terrain",
  "La terrasse & les allées",
  "Portail, clôture & pergola",
  "Les plantations",
  "Votre jardin prend vie",
] as const;
