import styles from "./ticker-band.module.css";

const tickerItems = ["Création paysagère", "Élagage raisonné", "Abattage sécurisé", "Taille de haies"];
const TICKER_REPEAT_COUNT = 4;

export function TickerBand() {
  const items = Array.from({ length: TICKER_REPEAT_COUNT }).flatMap(() => tickerItems);

  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.track}>
        {items.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
}
