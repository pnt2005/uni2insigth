'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  suggestions = [],
  onSuggestionSelect,
  autoFocus = false,
  placeholder = 'Tìm kiếm...',
  className = '',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // focusedIndex: chỉ số item đang được focus bằng bàn phím (-1 = chưa chọn)
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Mở dropdown khi có suggestions và ô input đang focus
  useEffect(() => {
    setDropdownOpen(suggestions.length > 0 && value.length > 0);
    setFocusedIndex(-1);
  }, [suggestions, value]);

  /**
   * Highlight phần text trong suggestion khớp với query.
   * Trả về mảng span với phần khớp được bọc trong <mark>.
   */
  const highlightMatch = useCallback(
    (text: string): React.ReactNode => {
      if (!value.trim()) return text;
      const regex = new RegExp(`(${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part
      );
    },
    [value]
  );

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    onSuggestionSelect?.(suggestion);
    setDropdownOpen(false);
    inputRef.current?.focus();
  };

  /** Keyboard navigation: ArrowUp/ArrowDown/Enter/Escape */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        if (focusedIndex >= 0) {
          e.preventDefault();
          selectSuggestion(suggestions[focusedIndex]);
        }
        break;
      case 'Escape':
        setDropdownOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  return (
    <div className={`${styles.wrap} ${className}`}>
      {/* Search icon */}
      <span className={styles.iconLeft} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>

      <input
        ref={inputRef}
        id="search-input"
        type="search"
        role="combobox"
        aria-expanded={dropdownOpen}
        aria-autocomplete="list"
        aria-controls="search-suggestions"
        aria-label="Tìm kiếm"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && value.length > 0 && setDropdownOpen(true)}
        onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
        autoComplete="off"
      />

      {/* Nút clear — chỉ hiện khi có query */}
      {value.length > 0 && (
        <button
          className={styles.clearBtn}
          onClick={() => { onChange(''); inputRef.current?.focus(); }}
          aria-label="Xóa tìm kiếm"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Autocomplete dropdown */}
      {dropdownOpen && (
        <ul
          id="search-suggestions"
          className={styles.dropdown}
          role="listbox"
          aria-label="Gợi ý tìm kiếm"
        >
          {suggestions.map((suggestion, idx) => (
            <li
              key={suggestion}
              id={`suggestion-${idx}`}
              role="option"
              aria-selected={focusedIndex === idx}
              className={`${styles.dropdownItem} ${focusedIndex === idx ? styles.focused : ''}`}
              onMouseDown={() => selectSuggestion(suggestion)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ opacity: 0.4, flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>{highlightMatch(suggestion)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
