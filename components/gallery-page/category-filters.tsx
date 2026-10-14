import { galleryCategories, galleryItems, type GalleryFilterId } from "./gallery-items";
import styles from "./category-filters.module.css";

type CategoryFiltersProps = {
  selected: GalleryFilterId;
  visibleCount: number;
  onSelect: (filter: GalleryFilterId) => void;
};

const filterOptions: { id: GalleryFilterId; label: string; count: number }[] = [
  { id: "all", label: "Tous", count: galleryItems.length },
  ...galleryCategories.map((category) => ({
    id: category.id,
    label: category.label,
    count: galleryItems.filter((item) => item.category === category.id).length,
  })),
];

export function CategoryFilters({ selected, visibleCount, onSelect }: CategoryFiltersProps) {
  return (
    <div id="galerie" role="toolbar" aria-label="Filtrer la galerie" className={styles.toolbar}>
      {filterOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          className={styles.chip}
          aria-pressed={option.id === selected}
          onClick={() => onSelect(option.id)}
        >
          {option.label} <sup>{option.count}</sup>
        </button>
      ))}
      <span className={styles.count}>
        {visibleCount} {visibleCount > 1 ? "ambiances" : "ambiance"}
      </span>
    </div>
  );
}
