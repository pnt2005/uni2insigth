import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`${styles.header} glass`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🎓</span>
          <span className={styles.logoText}>UniInsight</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/nganh-hoc" className={styles.navLink}>Ngành Học</Link>
          <Link href="/khu-vuc" className={styles.navLink}>Cụm Trường</Link>
          <Link href="/review" className={styles.navLink}>Review</Link>
          <Link href="/tra-cuu" className={styles.navLink}>Tra Cứu</Link>
          <Link href="/blog" className={styles.navLink}>Blog</Link>
        </nav>
        <div className={styles.actions}>
          <Link href="/login" className={styles.loginBtn}>Đăng Nhập</Link>
        </div>
      </div>
    </header>
  );
}
