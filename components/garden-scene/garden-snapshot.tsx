import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GardenView } from "./garden-views";

type GardenSnapshotProps = {
  view: GardenView;
  label?: string;
  className?: string;
};

export function GardenSnapshot({ view, label, className }: GardenSnapshotProps) {
  return (
    <div
      data-view={view}
      aria-hidden={label ? undefined : true}
      className={cn("relative h-full w-full bg-[radial-gradient(at_60%_30%,#5a5346,#2e2921_70%)]", className)}
    >
      <Image
        src={`/garden-stills/${view}.webp`}
        alt={label ?? ""}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
