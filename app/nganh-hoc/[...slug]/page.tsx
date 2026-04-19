import Link from "next/link";
import styles from "../../nganh-hoc/page.module.css";

export default async function NganhHocDeepPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPaths = resolvedParams.slug;
  const titlePath = slugPaths[slugPaths.length - 1].replace(/-/g, ' ').toUpperCase();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/nganh-hoc" style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại Danh sách Ngành học
        </Link>
      </div>

      <h1 className={styles.title} style={{ textAlign: 'left', marginBottom: '1rem' }}>
        Ngành: {titlePath}
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Đang hiển thị tổng quan thông tin cho ngành học <strong>{titlePath}</strong> nằm trong chuyên mục <strong>{slugPaths[0].replace(/-/g, ' ').toUpperCase()}</strong>.
        Trong tương lai, phần này sẽ hiển thị danh sách các bài đánh giá, điểm chuẩn, lộ trình nghề nghiệp riêng biệt cho ngành này.
      </p>

      <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3>Danh mục nội dung tương lai:</h3>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
          <li>Chi tiết chuẩn đầu ra và môn học</li>
          <li>Top trường đào tạo {titlePath} tốt nhất</li>
          <li>Phổ điểm chuẩn 3 năm gần nhất</li>
          <li>Mức lương khởi điểm tham khảo</li>
        </ul>
      </div>
    </div>
  );
}
