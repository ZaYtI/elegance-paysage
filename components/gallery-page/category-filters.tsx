import { ALL_CATEGORIES, type GalleryData } from "./gallery-entry";
import styles from "./category-filters.module.css";

type CategoryFiltersProps = {
  data: GalleryData;
  selected: string;
  visibleCount: number;
  onSelect: (filter: string) => void;
};

export function CategoryFilters({ data, selected, visibleCount, onSelect }: CategoryFiltersProps) {
  const filterOptions = [
    { id: ALL_CATEGORIES, label: "Tous", count: data.entries.length },
    ...data.categories.map((category) => ({
      id: category.id,
      label: category.label,
      count: data.entries.filter((entry) => entry.categoryId === category.id).length,
    })),
  ];

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
