import type { SanityCardImage, SanityHomeCard } from "@/lib/sanity/types";
import type { Service } from "@/lib/site-data";
import type { ExpertiseCardStyle } from "./expertise-cards";

export type ResolvedExpertiseCard = {
  title: string;
  tag: string;
  description: string;
  image: SanityCardImage | null;
};

export function resolveExpertiseCard(
  service: Service,
  style: ExpertiseCardStyle,
  override: SanityHomeCard | null | undefined,
): ResolvedExpertiseCard {
  return {
    title: override?.title || service.title,
    tag: override?.tag || style.tag,
    description: override?.description || service.description,
    image: override?.image ?? null,
  };
}
