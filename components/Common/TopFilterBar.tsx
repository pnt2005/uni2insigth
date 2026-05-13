'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, ChevronDown, Filter, X } from 'lucide-react';
import styles from './TopFilterBar.module.css';

interface TopFilterBarProps {
  placeholder?: string;
  filterOptions?: string[];
  filterLabel?: string;
}

export default function TopFilterBar({ 
  placeholder = 'Tìm kiếm...', 
  filterOptions = [], 
  filterLabel = 'Danh mục' 
}: TopFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQ = searchParams.get('q') || '';
  const currentCat = searchParams.get('cat') || 'Tất cả';

  const [query, setQuery] = useState(currentQ);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(currentQ);
  }, [currentQ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyFilters = (newQ: string, newCat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQ.trim()) params.set('q', newQ.trim());
    else params.delete('q');
    
    if (newCat && newCat !== 'Tất cả') params.set('cat', newCat);
    else params.delete('cat');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilters(query, currentCat);
    }
  };

  const clearSearch = () => {
    setQuery('');
    applyFilters('', currentCat);
  };

  return (
    <div className={styles.controlsRow}>
      <div className={styles.searchBox}>
        <Search size={18} color="#999" />
        <input 
          type="text" 
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          onBlur={() => {
            if (query !== currentQ) {
              applyFilters(query, currentCat);
            }
          }}
        />
        {query && (
          <X 
            size={16} 
            color="#999" 
            style={{ cursor: 'pointer' }} 
            onClick={clearSearch} 
          />
        )}
      </div>

      {filterOptions.length > 0 && (
        <div 
          className={styles.dropdownBox} 
          onClick={() => setShowMenu(!showMenu)}
          ref={menuRef}
        >
          <Filter size={18} color="#7b61ff" />
          <span>{currentCat === 'Tất cả' ? filterLabel : currentCat}</span>
          <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          
          {showMenu && (
            <div className={styles.dropdownMenu}>
              <div 
                className={`${styles.menuItem} ${currentCat === 'Tất cả' ? styles.active : ''}`}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setShowMenu(false); 
                  applyFilters(query, 'Tất cả'); 
                }}
              >
                Tất cả
              </div>
              {filterOptions.map(opt => (
                <div 
                  key={opt}
                  className={`${styles.menuItem} ${currentCat === opt ? styles.active : ''}`}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setShowMenu(false); 
                    applyFilters(query, opt); 
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
