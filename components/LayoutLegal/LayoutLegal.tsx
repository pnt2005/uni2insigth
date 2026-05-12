import styles from './LayoutLegal.module.css';

interface LayoutLegalProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function LayoutLegal({ sidebar, children }: LayoutLegalProps) {
  return (
    <div className={styles.layout}>
      {/* Sidebar (StickyTOC) — desktop only via CSS */}
      <aside className={styles.sidebar} aria-label="Mục lục tài liệu">
        {sidebar}
      </aside>

      {/* Main legal content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
