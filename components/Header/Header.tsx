'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/nganh-hoc',  label: 'Ngành Học',   icon: '📚' },
  { href: '/khu-vuc',    label: 'Cụm Trường',   icon: '🗺️' },
  { href: '/review',     label: 'Review',        icon: '⭐' },
  { href: '/search-hub', label: 'Tra Cứu',       icon: '🔍' },
  { href: '/blog',       label: 'Blog',          icon: '📰' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  if (pathname.startsWith('/auth')) return null;

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContainer}>

          {/* LEFT — Logo */}
          <div className={styles.navLeft}>
            <Link href="/" className={styles.logo} onClick={closeMenu}>
              <span className={styles.logoIcon}>🎓</span>
              <span>
                <span className={styles.logoWordmark}>Uni</span>
                <span className={styles.logoText}>2Insight</span>
              </span>
            </Link>
          </div>

          {/* CENTER — Nav links */}
          <div className={styles.navCenter}>
            <nav className={styles.nav} aria-label="Menu chính">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT — CTA + Hamburger */}
          <div className={styles.navRight}>
            <SearchBar />
            <Link href="/auth/login" className={styles.loginBtn}>
              Đăng nhập
            </Link>
            <button
              className={styles.hamburgerBtn}
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(p => !p)}
            >
              <div className={`${styles.hamburgerIcon} ${menuOpen ? styles.open : ''}`}>
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <nav className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`} aria-label="Menu di động">
        <div className="mobile-nav-header">
          <Link href="/" className="mobile-nav-logo" onClick={closeMenu}>
            🎓 <span>Uni2Insight</span>
          </Link>
          <button className="mobile-nav-close" onClick={closeMenu} aria-label="Đóng">✕</button>
        </div>

        <div className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="mobile-nav-link" onClick={closeMenu}>
              <span className="mobile-nav-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mobile-nav-footer">
          <Link href="/auth/login" className="mobile-nav-login-btn" onClick={closeMenu}>
            Đăng Nhập
          </Link>
        </div>
      </nav>
    </>
  );
}
