import { HeroBottomBar } from "./hero-bottom-bar";
import { HeroContent } from "./hero-content";
import { HeroJourney } from "./hero-journey";

export function HeroSection() {
  return (
    <HeroJourney>
      <HeroContent />
      <HeroBottomBar />
    </HeroJourney>
  );
}
