'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, MapPin, Filter, X, ChevronDown, Building2 } from 'lucide-react';
import universitiesData from '../../data/universities.json';
import styles from './search.module.css';

function SearchHubContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState('Toàn quốc');
  const [selectedRegion, setSelectedRegion] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('Điểm chuẩn');
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  
  // Real data from universities.json
  const universities = useMemo(() => universitiesData as any[], []);
  
  // Filter and search
  const filteredResults = useMemo(() => {
    let results = universities;
    
    // Filter by search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      results = results.filter((uni: any) => 
        uni.name?.toLowerCase().includes(lowerQuery) ||
        uni.title?.toLowerCase().includes(lowerQuery) ||
        uni.city?.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Filter by location
    if (selectedLocation !== 'Toàn quốc') {
      results = results.filter((uni: any) => 
        uni.city === selectedLocation || uni.city?.includes(selectedLocation)
      );
    }
    
    // Filter by region
    if (selectedRegion !== 'Tất cả') {
      results = results.filter((uni: any) => uni.region === selectedRegion);
    }
    
    // Sort results
    if (sortBy === 'Điểm chuẩn') {
      results = [...results].sort((a: any, b: any) => {
        const scoreA = parseFloat(a.admissionScoreRange?.toString() || '0') || 0;
        const scoreB = parseFloat(b.admissionScoreRange?.toString() || '0') || 0;
        return scoreB - scoreA;
      });
    } else if (sortBy === 'A-Z') {
      results = [...results].sort((a: any, b: any) => 
        (a.name || a.title || '').localeCompare(b.name || b.title || '')
      );
    }
    
    return results;
  }, [query, selectedLocation, selectedRegion, sortBy, universities]);

  // Get unique locations
  const locations = useMemo(() => {
    const locs = new Set(['Toàn quốc']);
    universities.forEach((uni: any) => {
      if (uni.city) locs.add(uni.city);
    });
    return Array.from(locs);
  }, [universities]);

  const removeTag = (tagToRemove: string) => {
    if (tagToRemove === selectedLocation) {
      setSelectedLocation('Toàn quốc');
    } else if (tagToRemove === selectedRegion) {
      setSelectedRegion('Tất cả');
    } else if (tagToRemove === sortBy) {
      setSortBy('Điểm chuẩn');
    }
  };

  const getTagsToDisplay = () => {
    const tags = [];
    if (query.trim()) tags.push(query);
    if (selectedLocation !== 'Toàn quốc') tags.push(selectedLocation);
    if (selectedRegion !== 'Tất cả') tags.push(selectedRegion);
    return tags;
  };

  return (
    <>

        {/* 1. Top Controls */}
        <div className={styles.controlsRow}>
          <div className={styles.searchBox}>
            <Search size={18} color="#999" />
            <input
              type="text"
              placeholder="Tìm kiếm trường đại học, ngành học, từ khóa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <X 
                size={16} 
                color="#999" 
                style={{ cursor: 'pointer' }} 
                onClick={() => setQuery('')} 
              />
            )}
          </div>

          <div 
            className={styles.dropdownBox}
            onClick={() => setShowLocationMenu(!showLocationMenu)}
          >
            <MapPin size={18} color="#7b61ff" />
            <span>{selectedLocation}</span>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
            
            {showLocationMenu && (
              <div className={styles.dropdownMenu}>
                {locations.map(loc => (
                  <div
                    key={loc}
                    className={`${styles.menuItem} ${selectedLocation === loc ? styles.active : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(loc);
                      setShowLocationMenu(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div 
            className={styles.filterBtn}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <Filter size={18} color="#777" />
            <span>Bộ lọc</span>
            {getTagsToDisplay().length > 0 && <span className={styles.badge}>{getTagsToDisplay().length}</span>}
            
            {showFilterPanel && (
              <div className={styles.dropdownMenu} style={{ padding: '1rem', width: '200px' }} onClick={(e) => e.stopPropagation()}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#333' }}>Vùng miền</h4>
                <select 
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setShowFilterPanel(false);
                  }}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none' }}
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Miền Bắc">Miền Bắc</option>
                  <option value="Miền Trung">Miền Trung</option>
                  <option value="Miền Nam">Miền Nam</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 2. Active Filter Tags */}
        <div className={styles.activeTagsRow}>
          {getTagsToDisplay().map(tag => (
            <span key={tag} className={styles.tag} onClick={() => {
              if (tag === selectedLocation) {
                setSelectedLocation('Toàn quốc');
              } else if (tag === selectedRegion) {
                setSelectedRegion('Tất cả');
              } else {
                setQuery('');
              }
            }}>
              <X size={14} /> {tag}
            </span>
          ))}
          {getTagsToDisplay().length > 0 && (
            <button 
              className={styles.clearAll} 
              onClick={() => {
                setQuery('');
                setSelectedLocation('Toàn quốc');
                setSelectedRegion('Tất cả');
              }}
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {/* 3. Results Header */}
        <div className={styles.resultsHeader}>
          <span>Chúng tôi tìm thấy <strong>{filteredResults.length} kết quả</strong></span>
          <div 
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            Sắp xếp theo: <strong>{sortBy}</strong> <ChevronDown size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
            
            {showSortMenu && (
              <div className={styles.dropdownMenu} style={{ right: 0, left: 'auto' }}>
                <div
                  className={`${styles.menuItem} ${sortBy === 'Điểm chuẩn' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortBy('Điểm chuẩn');
                    setShowSortMenu(false);
                  }}
                >
                  Điểm chuẩn
                </div>
                <div
                  className={`${styles.menuItem} ${sortBy === 'A-Z' ? styles.active : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortBy('A-Z');
                    setShowSortMenu(false);
                  }}
                >
                  A-Z
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Results List (Card Layout) */}
        <div className={styles.resultsList}>
          {filteredResults.length > 0 ? (
            filteredResults.map((item: any, index: number) => (
              <div 
                key={item.id || index} 
                className={styles.card}
                onClick={() => router.push(`/review/${item.id}`)}
              >
                <div className={styles.cardLeft}>
                  <div className={styles.cardLogo}>
                    <Building2 size={24} />
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>
                      {item.name || item.title}
                      {item.majors && item.majors.length > 0 && (
                        <div className={styles.cardTags}>
                          <span className={`${styles.miniTag} ${styles.tagBlue}`}>{item.majors[0]}</span>
                        </div>
                      )}
                    </h3>
                    <p className={styles.cardSubtitle}>{item.region || 'Đại học'} — {item.city}</p>
                  </div>
                </div>
                <div className={styles.cardRight}>
                  <div className={styles.cardScore}>{item.admissionScoreRange || 'N/A'}</div>
                  <div className={styles.cardTime}>Cập nhật 2 ngày trước</div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>Không tìm thấy kết quả nào. Vui lòng thử với từ khóa khác.</p>
            </div>
          )}
        </div>

    </>
  );
}

export default function SearchHubClient() {
  return (
    <Suspense fallback={<div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Đang tải dữ liệu tra cứu...</div>}>
      <SearchHubContent />
    </Suspense>
  );
}