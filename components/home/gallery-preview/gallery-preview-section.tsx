import { Eyebrow } from "@/components/ui/eyebrow";
import { PillLink } from "@/components/ui/pill-link";
import { fetchHomePage } from "@/lib/sanity/home-content";
import { UpcomingPhotos } from "@/components/ui/upcoming-photos";
import { SanityGalleryPreviewGrid } from "./sanity-gallery-preview-grid";
import { toSanityGalleryPreviewPhoto } from "./sanity-gallery-preview-photo";

export async function GalleryPreviewSection() {
  const homePage = await fetchHomePage();
  const photos = (homePage?.galleryPreview ?? []).map(toSanityGalleryPreviewPhoto);
  const hasPhotos = photos.length > 0;
  const showsExamples = photos.some((photo) => photo.isExample);

  return (
    <section
      id="galerie"
      className="bg-paper px-[22px] py-[70px] text-[#1e1b16] min-[651px]:px-[6%] min-[651px]:py-[90px] min-[951px]:py-[125px] min-[1700px]:px-[max(6%,calc(50vw-750px))]"
    >
      <div className="mb-7 min-[651px]:mb-[50px] min-[651px]:flex min-[651px]:items-end min-[651px]:justify-between min-[651px]:gap-[45px]">
        <div className="reveal">
          <Eyebrow>04 / Inspirations jardin</Eyebrow>
          <h2 className="section-title mt-[22px]">
            De la matière.
            <br />
            Du vert. De la vie.
          </h2>
        </div>
        <p className="reveal mt-[18px] max-w-[320px] text-[15px] leading-[1.7] text-bark-700 min-[651px]:mt-0">
          Terrasses, plantations, lignes végétales : quelques ambiances pour imaginer votre extérieur.
          <br />
          {showsExamples && <strong>Vues 3D de la maquette, et non nos réalisations.</strong>}
        </p>
      </div>
      {hasPhotos ? <SanityGalleryPreviewGrid photos={photos} /> : <UpcomingPhotos subline="Nos premières réalisations arrivent bientôt." />}
      <div className="mt-[30px] flex flex-col items-stretch gap-3.5 border-t border-bark-700/25 pt-[30px] min-[651px]:mt-10 min-[651px]:flex-row min-[651px]:items-center min-[651px]:justify-between min-[651px]:gap-[25px]">
        <PillLink href="/galerie" variant="dark">
          Voir toute la galerie
        </PillLink>
        <p className="text-sm text-bark-700">Parcourez les photos par type d’aménagement.</p>
      </div>
    </section>
  );
}
