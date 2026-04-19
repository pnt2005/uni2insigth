import Link from "next/link";
import styles from "../../nganh-hoc/page.module.css";

export default async function RegionDeepPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const regionSlug = resolvedParams.slug;
  const regionName = regionSlug.replace(/-/g, ' ').toUpperCase();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/khu-vuc" style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại Cụm Trường theo Khu Vực
        </Link>
      </div>

      <h1 className={styles.title} style={{ textAlign: 'left', marginBottom: '1rem' }}>
        Các trường đại học tại: {regionName}
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Mục này đang hiển thị danh sách tĩnh thử nghiệm cho khu vực <strong>{regionName}</strong>.
      </p>

      <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', minHeight: '200px' }}>
        <h3 style={{ color: '#0f172a' }}>Danh sách trường (Đang cập nhật...):</h3>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
          <li>Đại học Quốc tang (Khu vực {regionName})</li>
          <li>Đại học Kinh tế - Tài chính (Khu vực {regionName})</li>
        </ul>
      </div>
    </div>
  );
}
