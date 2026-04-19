import Link from "next/link";
import styles from "../../nganh-hoc/page.module.css";

export default async function BlogDeepPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const titlePath = slug.replace(/-/g, ' ').toUpperCase();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/blog" style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại Blog Danh mục
        </Link>
      </div>

      <h1 className={styles.title} style={{ textAlign: 'left', marginBottom: '1rem', fontSize: '2.5rem' }}>
        {titlePath}
      </h1>
      
      <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        <span>Đăng lúc: Cập nhật mới nhất 2026</span> • <span>Tác giả: UniInsight Team</span>
      </div>

      <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#334155' }}>
        <p>
          Xin chào! Bạn đang truy cập bài viết <strong>{titlePath}</strong>. 
          Hiện tại tính năng Blog chi tiết đang trong giai đoạn phát triển nội dung và hệ thống CMS.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Đội ngũ nội dung của UniInsight sẽ sớm cập nhật bài viết này với những phân tích chuyên sâu về thị trường lao động, xu hướng ngành nghề, và các số liệu báo cáo tin cậy nhất. Vui lòng đón chờ!
        </p>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Đăng ký nhận thông báo</h3>
        <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Nhận bài viết phân tích ngành mới nhất qua email.</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <input type="email" placeholder="Email của bạn..." style={{ padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', width: '250px' }} />
          <button style={{ padding: '0.6rem 1.5rem', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 500 }}>Đăng ký</button>
        </div>
      </div>
    </div>
  );
}
