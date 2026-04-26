'use client';

import { useState, useEffect, useMemo, useRef, ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import universitiesData from '../../data/universities.json';
import { normalizeForSearch } from '../../utils/slugify';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  /** Nếu true, luôn hiển thị full input (dùng trên desktop). 
   *  Nếu false (mặc định), ở mobile chỉ hiện icon, click mới mở rộng. */
  alwaysExpanded?: boolean;
}

export default function SearchBar({ alwaysExpanded = false }: SearchBarProps) {
  const [searchType, setSearchType] = useState('review');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // State riêng cho mobile expand
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [externalData, setExternalData] = useState<{ blogs: any[]; majors: any[] }>({ blogs: [], majors: [] });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (!isDataLoaded && (searchType === 'blog' || searchType === 'major' || isOpen)) {
      fetch('/api/search-data', { cache: 'no-store' })
        .then((r) => r.json())
        .then((data) => {
          setExternalData(data);
          setIsDataLoaded(true);
        })
        .catch((err) => console.error('Failed to load search data', err));
    }
  }, [searchType, isOpen, isDataLoaded]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsTypeDropdownOpen(false);
        if (!alwaysExpanded) setMobileExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [alwaysExpanded]);

  // Khi mobileExpanded mở, focus input
  useEffect(() => {
    if (mobileExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mobileExpanded]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = normalizeForSearch(searchTerm);

    if (searchType === 'review') {
      return universitiesData
        .filter((uni) => {
          const nameMatch = normalizeForSearch(uni.name).includes(query);
          const idMatch = normalizeForSearch(uni.id).includes(query);
          const majorMatch = uni.majors.some((major) => normalizeForSearch(major).includes(query));
          return nameMatch || idMatch || majorMatch;
        })
        .slice(0, 6);
    } else if (searchType === 'major') {
      return externalData.majors
        .filter((major: any) => {
          const titleMatch = normalizeForSearch(major.title).includes(query);
          const categoryMatch = normalizeForSearch(major.category || '').includes(query);
          return titleMatch || categoryMatch;
        })
        .slice(0, 6);
    } else if (searchType === 'blog') {
      return externalData.blogs
        .filter((blog: any) => {
          const titleMatch = normalizeForSearch(blog.title).includes(query);
          const categoryMatch = normalizeForSearch(blog.category || '').includes(query);
          return titleMatch || categoryMatch;
        })
        .slice(0, 6);
    }

    return [];
  }, [searchTerm, searchType, externalData]);

  const getMatchContext = (item: any): string | ReactElement => {
    const query = normalizeForSearch(searchTerm);

    if (searchType === 'review') {
      if (normalizeForSearch(item.name).includes(query) || normalizeForSearch(item.id).includes(query)) {
        return item.city;
      }
      const matchedMajor = item.majors.find((m: string) => normalizeForSearch(m).includes(query));
      if (matchedMajor) {
        return (
          <span>
            {item.city} &bull; <span className={styles.matchHighlight}>Ngành: {matchedMajor}</span>
          </span>
        );
      }
      return item.city;
    } else if (searchType === 'major') {
      return item.category || 'Ngành học';
    } else if (searchType === 'blog') {
      return item.category || 'Cẩm nang sinh viên';
    }
    return '';
  };

  const getLinkHref = (item: any) => {
    if (searchType === 'review') return `/review/${item.id}`;
    if (searchType === 'major') return `/nganh-hoc/${item.slug}`;
    if (searchType === 'blog') return `/blog/${item.slug}`;
    return '#';
  };

  const getImageSrc = (item: any) => {
    if (searchType === 'review') return item.image;
    if (searchType === 'major')
      return item.thumbnail || 'https://img.freepik.com/free-vector/graduation-cap-diploma-concept_1284-44161.jpg';
    if (searchType === 'blog')
      return item.thumbnail || 'https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg';
    return '';
  };

  const searchTypeLabels: Record<string, string> = {
    review: 'Trường',
    major: 'Ngành',
    blog: 'Blog',
  };

  const handleIconClick = () => {
    setMobileExpanded(true);
    setIsOpen(true);
  };

  // Nút icon thu gọn — chỉ hiện trên mobile khi chưa expand
  const searchIconBtn = (
    <button
      type="button"
      className={styles.searchIconBtn}
      aria-label="Mở thanh tìm kiếm"
      onClick={handleIconClick}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button>
  );

  // Panel tìm kiếm đầy đủ (desktop luôn hiện, mobile hiện khi expanded)
  const searchPanel = (
    <div className={styles.searchWrapper} ref={wrapperRef}>
      {/* Type selector */}
      <div className={styles.typeSelectorContainer}>
        <button
          type="button"
          className={styles.typeSelectBtn}
          onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
        >
          {searchTypeLabels[searchType]}
          <svg className={styles.chevronIcon} width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isTypeDropdownOpen && (
          <div className={styles.typeDropdownMenu}>
            {Object.entries(searchTypeLabels).map(([val, label]) => (
              <button
                key={val}
                type="button"
                className={`${styles.typeDropdownItem} ${searchType === val ? styles.activeType : ''}`}
                onClick={() => {
                  setSearchType(val);
                  setIsTypeDropdownOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        className={styles.searchInput}
        placeholder={`Tìm ${searchType === 'review' ? 'trường học' : searchType === 'major' ? 'ngành học' : 'bài viết'}...`}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {/* Nút đóng (chỉ hiện trên mobile khi đang expanded) */}
      <button
        type="button"
        className={styles.searchCloseBtn}
        aria-label="Đóng tìm kiếm"
        onClick={() => {
          setMobileExpanded(false);
          setIsOpen(false);
          setSearchTerm('');
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Search icon (chỉ hiện khi desktop / search panel) */}
      <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      {/* Dropdown kết quả */}
      {isOpen && searchTerm.trim() !== '' && (
        <div className={styles.dropdown}>
          {results.length > 0 ? (
            results.map((item: any) => (
              <Link
                href={getLinkHref(item)}
                key={item.id || item.slug}
                className={styles.resultItem}
                onClick={() => {
                  setIsOpen(false);
                  setMobileExpanded(false);
                }}
              >
                <div style={{ position: 'relative', width: '45px', height: '45px', flexShrink: 0, marginRight: '14px' }}>
                  <Image
                    src={getImageSrc(item)}
                    alt={item.title || item.name}
                    fill
                    className={styles.logo}
                    sizes="45px"
                  />
                </div>
                <div className={styles.resultInfo}>
                  <p className={styles.uniName}>{item.title || item.name}</p>
                  <p className={styles.uniMeta}>{getMatchContext(item)}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.noResults}>Không tìm thấy kết quả phù hợp</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.searchContainer}>
      {/* Icon button — chỉ hiện trên mobile khi chưa expand */}
      <div className={`${styles.iconOnly} ${mobileExpanded ? styles.iconHidden : ''}`}>
        {searchIconBtn}
      </div>

      {/* Search panel — luôn hiện trên desktop, chỉ hiện khi mobileExpanded trên mobile */}
      <div className={`${styles.panelWrapper} ${mobileExpanded ? styles.panelExpanded : ''}`}>
        {searchPanel}
      </div>
    </div>
  );
}
