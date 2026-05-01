import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Cột 1: Thương hiệu & Social */}
          <div className={styles.brandSection}>
            <Link href="/" className={styles.logoWrapper}>
              <svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoIcon}>
                <rect width="40" height="40" rx="10" fill="url(#logo-grad)" />
                <path d="M10 18L20 12L30 18L20 24L10 18Z" fill="white" />
                <path d="M13 20V25C13 25 16 29 20 29C24 29 27 25 27 25V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="30" cy="25" r="1.5" fill="white" />
                <path d="M30 18V25" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.logo}>Uni2Insight</span>
            </Link>
            <p className={styles.description}>
              Nền tảng tra cứu thông tin tuyển sinh, điểm chuẩn, học phí và đánh giá trường Đại học uy tín hàng đầu Việt Nam. Giúp bạn tự tin vững bước trên con đường tương lai.
            </p>
            <div className={styles.socials}>
              <a href="https://www.facebook.com/profile.php?id=61567552554990&sk=followers" target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} aria-label="Tiktok">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.66a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Khám Phá */}
          <div className={styles.linksSection}>
            <h3 className={styles.columnTitle}>Khám Phá</h3>
            <ul className={styles.linkList}>
              <li><Link href="/review" className={styles.link}>Review Trường Đại Học</Link></li>
              <li><Link href="/nganh-hoc" className={styles.link}>Cẩm Nang Ngành Học</Link></li>
              <li><Link href="/blog" className={styles.link}>Blog & Tin Tức</Link></li>
              <li><Link href="/search-hub" className={styles.link}>Tra Cứu Thông Tin</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ Trợ */}
          <div className={styles.linksSection}>
            <h3 className={styles.columnTitle}>Hỗ Trợ</h3>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.link}>Về Chúng Tôi</Link></li>
              <li><Link href="/contact" className={styles.link}>Chăm Sóc Khách Hàng</Link></li>
              <li><Link href="/privacy" className={styles.link}>Chính Sách Bảo Mật</Link></li>
              <li><Link href="/terms" className={styles.link}>Điều Khoản Sử Dụng</Link></li>
            </ul>
          </div>

          {/* Cột 4: Liên Hệ */}
          <div className={styles.linksSection}>
            <h3 className={styles.columnTitle}>Liên Hệ</h3>
            <ul className={styles.linkList}>
              <li>
                <div className={styles.contactItem}>
                  <strong className={styles.contactLabel}>Hotline:</strong>
                  <span>1900 1234</span>
                </div>
              </li>
              <li>
                <div className={styles.contactItem}>
                  <strong className={styles.contactLabel}>Email:</strong>
                  <span>hotro@uni2insight.com</span>
                </div>
              </li>
              <li>
                <div className={styles.contactItem}>
                  <strong className={styles.contactLabel}>Văn phòng:</strong>
                  <span>Tòa nhà Innovation, CVPM Quang Trung, Q.12, TP.HCM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Khu vực Bản quyền & Huy hiệu */}
        <div className={styles.bottomSection}>
          <p>&copy; {new Date().getFullYear()} Uni2Insight. All rights reserved. Phát triển dành cho học sinh Việt Nam.</p>

          {/* <div className={styles.trustBadges}>
            <div className={styles.bctBadge} title="Đã thông báo Bộ Công Thương">
              <span className={styles.checkIcon}>✓</span>
              Đã kiểm duyệt
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}