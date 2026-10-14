import styles from "./burger-button.module.css";

type BurgerButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function BurgerButton({ isOpen, onToggle }: BurgerButtonProps) {
  return (
    <button
      type="button"
      className={styles.burger}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label="Menu"
    >
      <i className={styles.bar} />
      <i className={styles.bar} />
    </button>
  );
}
