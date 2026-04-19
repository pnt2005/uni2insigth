import Link from "next/link";
import styles from "../../nganh-hoc/page.module.css";
import { notFound } from 'next/navigation';

export default async function TraCuuFeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const features: Record<string, { title: string, desc: string }> = {
    'diem-chuan': { title: 'Tra cứu Điểm chuẩn', desc: 'Dữ liệu điểm chuẩn các năm từ 2020-2025' },
    'hoc-phi': { title: 'Tra cứu Học phí', desc: 'Thông tin học phí mới nhất và lộ trình tăng' },
    'hoc-bong': { title: 'Tra cứu Học bổng', desc: 'Tổng hợp các loại học bổng và tiêu chuẩn ứng tuyển' },
    'so-sanh': { title: 'So sánh Trường', desc: 'So sánh 2-3 trường đại học cùng lúc về môi trường học' },
  };

  const feature = features[slug];
  if (!feature) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/tra-cuu" style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại Trung tâm Tra Cứu
        </Link>
      </div>

      <h1 className={styles.title} style={{ textAlign: 'left', marginBottom: '1rem' }}>
        {feature.title}
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Công cụ <strong>{feature.title}</strong> hiện đang được đội ngũ UniInsight xây dựng và sẽ sớm ra mắt trong tương lai gần.
        <br/><br/>
        Mô tả tính năng: {feature.desc}.
      </p>

      <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
        <h3 style={{ color: '#64748b' }}>🚧 Tính năng đang được phát triển...</h3>
      </div>
    </div>
  );
}
