import styles from "../../Review.module.css";
import Link from "next/link";

export default async function TuitionFeePage({ params }: { params: Promise<{ school: string }> }) {
  const resolvedParams = await params;
  const schoolName = "Đại học " + resolvedParams.school.replace(/-/g, ' ').toUpperCase();

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>Chi tiết học phí {schoolName} năm 2026</h1>
      
      <div className={styles.metaTags}>
        <span className={styles.tag}>Học phí</span>
        <span className={styles.tag}>Cập nhật 2026</span>
      </div>

      <div className={styles.content}>
        <p>Học phí là một trong những yếu tố được phụ huynh và học sinh quan tâm hàng đầu khi lựa chọn <strong>{schoolName}</strong>. Bài viết này sẽ phân tích chi tiết mức học phí theo từng ngành học.</p>
        
        <h2 id="gioi-thieu">1. Mức học phí chung</h2>
        <p>Mức học phí trung bình của trường rơi vào khoảng 25.000.000 VNĐ đến 35.000.000 VNĐ một học kỳ. Một năm học có 3 học kỳ đối với hệ thường và 2 học kỳ đối với hệ quốc tế.</p>
        
        <h2 id="chuong-trinh">2. Học phí theo nhóm ngành</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', border: '1px solid var(--border)' }}>
          <thead style={{ background: 'var(--background)' }}>
            <tr>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>Nhóm ngành</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>Học phí/Học kỳ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Kỹ thuật - Công nghệ</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>30.000.000 VNĐ</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Kinh doanh - Quản lý</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>27.500.000 VNĐ</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Ngôn ngữ</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>25.000.000 VNĐ</td>
            </tr>
          </tbody>
        </table>

        <h2 id="co-hoi">3. Chính sách học bổng</h2>
        <ul>
          <li>Học bổng 100% dành cho thủ khoa đầu vào.</li>
          <li>Học bổng 50% - 70% dành cho học sinh giỏi quốc gia.</li>
        </ul>
      </div>
    </article>
  );
}
