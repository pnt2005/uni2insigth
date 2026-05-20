import Link from "next/link";
import styles from "./FilterLayout.module.css";

interface FilterLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  filters?: React.ReactNode;
}

export default function FilterLayout({ title, subtitle, children, filters }: FilterLayoutProps) {
  return (
    <div className={`container ${styles.layout}`} style={!title ? { paddingTop: '1rem' } : undefined}>
      <div className={styles.mainContent}>
        {title && (
          <div className={styles.header}>
            <div>
              <h1 className={styles.pageTitle}>{title}</h1>
              {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
            </div>
          </div>
        )}

        {filters && (
          <div className={styles.topFilters}>
            {filters}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
