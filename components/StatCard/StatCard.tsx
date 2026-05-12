import styles from './StatCard.module.css';

interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <article className={styles.card}>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
    </article>
  );
}
