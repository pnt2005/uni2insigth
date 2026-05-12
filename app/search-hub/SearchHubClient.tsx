'use client';

import { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, History, TrendingUp, X, Check, ArrowRight } from 'lucide-react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResult from '../../components/SearchResult/SearchResult';
import SearchSkeleton from '../../components/SearchSkeleton/SearchSkeleton';
import universitiesData from '../../data/universities.json';
import styles from './search.module.css';

// --- Types & Constants ---
const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'universities', label: 'Trường đại học' },
  { id: 'articles', label: 'Bài viết' },
  { id: 'docs', label: 'Tài liệu' },
];

const TRENDING = ['Điểm chuẩn 2024', 'Học bổng toàn phần', 'Ngành kỹ thuật', 'Y khoa', 'Công nghệ thông tin'];

// --- Component ---
function SearchHubContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Memoized data for instant filtering
  const allResults = useMemo(() => {
    const unis = universitiesData.map(uni => ({
      id: uni.id,
      type: 'Trường đại học',
      title: uni.name,
      description: `${uni.region} • ${uni.city} • Điểm chuẩn: ${uni.admissionScoreRange} • Học phí: ${uni.tuitionText}`,
      href: `/review/${uni.id}`,
      category: 'universities'
    }));

    const mock = [
      { id: 'a1', type: 'Bài viết', title: 'Điểm chuẩn Bách Khoa 2024', description: 'Chi tiết điểm chuẩn các ngành năm 2024.', href: '#', category: 'articles' },
      { id: 'a2', type: 'Tài liệu', title: 'Hướng dẫn tuyển sinh', description: 'Cẩm nang cho thí sinh 2k6.', href: '#', category: 'docs' }
    ];

    return [...unis, ...mock];
  }, []);

  // Filter results
  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allResults.filter(item => {
      const matchQuery = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      return matchQuery && matchCat;
    });
  }, [allResults, query, activeCategory]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return allResults
      .filter(i => i.title.toLowerCase().includes(query.toLowerCase()))
      .map(i => i.title)
      .slice(0, 6);
  }, [allResults, query]);

  // Effects
  useEffect(() => {
    if (query) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 500);
      return () => clearTimeout(timer);
    }
  }, [query, activeCategory]);

  return (
    <div className={styles.searchPage}>
      {/* 1. Top Search Area */}
      <section className={styles.searchHeader}>
        <div className={styles.searchHeaderInner}>
          <h1>Tra cứu thông tin</h1>
          <p>Tìm kiếm trường đại học, ngành học và tài liệu giáo dục tốt nhất dành cho bạn.</p>
          
          <div className={styles.searchBox}>
            <div style={{ flex: 1 }}>
              <SearchBar 
                value={query} 
                onChange={setQuery} 
                suggestions={suggestions}
                onSuggestionSelect={setQuery}
                placeholder="Ví dụ: Đại học Kinh tế, Ngành CNTT..."
                className={styles.minimalSearch}
              />
            </div>
            <button className={styles.searchBtn}>
              <Search size={18} />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Stats & Quick Filters */}
      <div className={styles.statsBar}>
        <div className={styles.statsBarInner}>
          <span className={styles.resultCount}>
            Tìm thấy <strong>{filteredResults.length}</strong> kết quả
          </span>
          <div className={styles.quickFilters}>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                className={`${styles.filterChip} ${activeCategory === cat.id ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Content */}
      <div className={styles.mainGrid}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.facetGroup}>
            <h3 className={styles.facetTitle}>Lọc theo loại</h3>
            <div className={styles.facetList}>
              {CATEGORIES.map(cat => (
                <div 
                  key={cat.id} 
                  className={`${styles.facetItem} ${activeCategory === cat.id ? styles.facetItemActive : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <div className={styles.customCheck}>
                    {activeCategory === cat.id && <Check size={12} strokeWidth={3} />}
                  </div>
                  {cat.label}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.facetGroup}>
            <h3 className={styles.facetTitle}>Từ khóa hot</h3>
            <div className={styles.facetList}>
              {TRENDING.map(tag => (
                <div key={tag} className={styles.facetItem} onClick={() => setQuery(tag)}>
                  <TrendingUp size={14} style={{ opacity: 0.5 }} />
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <section className={styles.results}>
          {isSearching ? (
            <SearchSkeleton count={5} />
          ) : filteredResults.length > 0 ? (
            filteredResults.map(item => (
              <SearchResult 
                key={item.id}
                type={item.type}
                title={item.title}
                description={item.description}
                href={item.href}
                query={query}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <h2>Không tìm thấy kết quả</h2>
              <p>Thử tìm kiếm với từ khóa khác hoặc xóa bớt các bộ lọc.</p>
              <button className={styles.searchBtn} onClick={() => { setQuery(''); setActiveCategory('all'); }}>
                Xóa tất cả
              </button>
              
              <div className={styles.suggestionGrid}>
                {TRENDING.slice(0, 3).map(tag => (
                  <div key={tag} className={styles.suggestionCard} onClick={() => setQuery(tag)}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>GỢI Ý</p>
                    <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {tag} <ArrowRight size={16} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* 4. Mobile Controls */}
      <div className={styles.mobileFilters}>
        <button className={styles.mobileBtn} onClick={() => setMobileMenuOpen(true)}>
          <Filter size={18} />
          Bộ lọc
        </button>
      </div>

      {mobileMenuOpen && (
        <>
          <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />
          <div className={`${styles.mobileSheet} ${mobileMenuOpen ? styles.mobileSheetOpen : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Bộ lọc</h2>
              <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            
            <div className={styles.facetGroup}>
              <h3 className={styles.facetTitle}>Danh mục</h3>
              <div className={styles.facetList}>
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id} 
                    className={`${styles.facetItem} ${activeCategory === cat.id ? styles.facetItemActive : ''}`}
                    onClick={() => { setActiveCategory(cat.id); setMobileMenuOpen(false); }}
                  >
                    <div className={styles.customCheck}>
                      {activeCategory === cat.id && <Check size={12} strokeWidth={3} />}
                    </div>
                    {cat.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchHubClient() {
  return (
    <Suspense fallback={<SearchSkeleton count={5} />}>
      <SearchHubContent />
    </Suspense>
  );
}
