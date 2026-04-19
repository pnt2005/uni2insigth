import Link from "next/link";
import styles from "./FilterLayout.module.css";

interface FilterLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function FilterLayout({ title, subtitle, children }: FilterLayoutProps) {
  return (
    <div className={`container ${styles.layout}`}>
      <aside className={styles.sidebar}>
        <div className={styles.filterBox}>
          <h3 className={styles.filterTitle}>Bộ Lọc</h3>
          
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Khu Vực</label>
            <select className={styles.select}>
              <option value="">Tất cả</option>
              <option value="hn">Miền Bắc</option>
              <option value="mt">Miền Trung</option>
              <option value="mn">Miền Nam</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Loại Trường</label>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> Công lập
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> Tư thục
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> Quốc tế
              </label>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Học Phí (1 năm)</label>
            <input type="range" min="10" max="100" className={styles.range} />
            <div className={styles.rangeLabels}>
              <span>10tr</span>
              <span>100tr+</span>
            </div>
          </div>

          <button className={styles.applyBtn}>Áp dụng Bộ Lọc</button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>{title}</h1>
            {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
          </div>
          <div className={styles.viewToggle}>
            <button className={`${styles.toggleBtn} ${styles.active}`}>Lưới</button>
            <button className={styles.toggleBtn}>Bảng</button>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
