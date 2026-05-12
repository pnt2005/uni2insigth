import styles from './TLDRBox.module.css';

interface TLDRBoxProps {
  items: string[];
  note?: string;
}

export default function TLDRBox({ items, note }: TLDRBoxProps) {
  return (
    <div className={styles.box} role="note" aria-label="Tóm tắt nhanh">
      <p className={styles.label}>📋 Tóm tắt nhanh</p>
      <ul className={styles.list}>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
