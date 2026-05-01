import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Oops! Không tìm thấy trang</h2>
        <p className={styles.description}>
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không truy cập được.
        </p>
        <Link href="/" className={styles.homeLink}>
          Về trang chủ
        </Link>
      </div>
      
      {/* Decorative background elements */}
      <div className={styles.illustration}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </div>
  );
}
