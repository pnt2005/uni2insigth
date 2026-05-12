'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './StickyTOC.module.css';

export interface TocItem {
  id: string;
  label: string;
}

interface StickyTOCProps {
  items: TocItem[];
}

export default function StickyTOC({ items }: StickyTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // IntersectionObserver: theo dõi các h2 với id trong content
  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Tìm entry đang hiện trên viewport (intersecting), ưu tiên entry ở trên cùng
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${64 + 16}px 0px -60% 0px`,
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = document.getElementById(e.target.value);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop sticky TOC */}
      <nav className={styles.toc} aria-label="Mục lục">
        <p className={styles.tocTitle}>Mục lục</p>
        <ul className={styles.tocList}>
          {items.map((item) => (
            <li
              key={item.id}
              className={`${styles.tocItem} ${activeId === item.id ? styles.active : ''}`}
            >
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile select dropdown — ẩn trên desktop */}
      <div className={styles.mobileSelect}>
        <label htmlFor="toc-select" className={styles.mobileSelectLabel}>
          Chuyển đến mục:
        </label>
        <select
          id="toc-select"
          className={styles.mobileSelectEl}
          onChange={handleSelectChange}
          defaultValue=""
        >
          <option value="" disabled>— Chọn mục —</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
      </div>
    </>
  );
}
