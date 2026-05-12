import styles from './AuthDivider.module.css';

export default function AuthDivider({ children = 'hoặc' }: { children?: React.ReactNode }) {
  return <div className={styles.divider}>{children}</div>;
}
