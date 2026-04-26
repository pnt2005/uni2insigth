'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/nganh-hoc', label: 'Ngành Học',  icon: '📚' },
  { href: '/khu-vuc',   label: 'Cụm Trường', icon: '🗺️' },
  { href: '/review',    label: 'Review',      icon: '⭐' },
  { href: '/tra-cuu',   label: 'Tra Cứu',     icon: '🔍' },
  { href: '/blog',      label: 'Blog',         icon: '📰' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Khóa scroll body khi drawer mở
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} glass`}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoIcon}>🎓</span>
            <span className={styles.logoText}>Uni2Insight</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Menu chính">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <SearchBar />
            {/* Login button — ẩn trên mobile (đã có trong drawer) */}
            <Link href="/login" className={`${styles.loginBtn} header-login-desktop`}>
              Đăng Nhập
            </Link>

            {/* Hamburger button — chỉ hiện trên mobile */}
            <button
              className="hamburger-btn"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6"  x2="21" y2="6"  />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Nav Drawer */}
      <nav
        className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}
        aria-label="Menu di động"
      >
        <div className="mobile-nav-header">
          <Link href="/" className="mobile-nav-logo" onClick={closeMenu}>
            🎓 Uni2Insight
          </Link>
          <button
            className="mobile-nav-close"
            onClick={closeMenu}
            aria-label="Đóng menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              <span className="mobile-nav-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mobile-nav-footer">
          <Link href="/login" className="mobile-nav-login-btn" onClick={closeMenu}>
            Đăng Nhập
          </Link>
        </div>
      </nav>
    </>
  );
}
