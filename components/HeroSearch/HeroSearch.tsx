'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HeroSearch.module.css';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search-hub?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchWrap}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Nhập tên trường, mã trường hoặc ngành học..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
