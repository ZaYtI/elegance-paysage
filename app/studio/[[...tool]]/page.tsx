import { SanityStudio } from "@/components/studio/sanity-studio";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <SanityStudio />;
}
