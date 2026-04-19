import Link from "next/link";
import styles from "../nganh-hoc/page.module.css";

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h1 className={styles.title} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Đăng Nhập
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>
        Tính năng hệ thống thành viên của UniInsight hiện đang bảo trì. <br/>Vui lòng quay lại sau!
      </p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/" style={{ background: 'var(--primary-color)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>
          Quay lại Trang Chủ
        </Link>
      </div>
    </div>
  );
}
