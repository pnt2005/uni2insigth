import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import FilterLayout from '../../components/Common/FilterLayout';
import styles from '../nganh-hoc/page.module.css';

export default async function ReviewIndex() {
  const reviewsDir = path.join(process.cwd(), 'data/reviews');
  let reviews: Array<{ slug: string, title: string, schoolName: string, description: string }> = [];
  
  try {
    const filenames = fs.readdirSync(reviewsDir);
    reviews = filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map((filename) => {
        const filePath = path.join(reviewsDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        return {
          slug: filename.replace(/\.mdx$/, ''),
          title: data.title || "Bài Review Trường",
          schoolName: data.schoolName || "Đại học",
          description: data.description || "Nhấn vào để xem chi tiết bài đánh giá toàn diện về trường đại học này."
        };
      });
  } catch (error) {
    console.error("Lỗi khi đọc file review", error);
  }

  return (
    <FilterLayout 
      title="Danh Sách Review" 
      subtitle="Tổng hợp các bài đánh giá, phân tích trải nghiệm thực tế về tất cả các trường đại học."
    >
      <div className={styles.grid}>
        {reviews.map((review, idx) => (
          <Link href={`/review/${review.slug}`} key={idx} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.category}>Review Chi Tiết</span>
            </div>
            <h3 className={styles.title} style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              {review.schoolName}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {review.description.substring(0, 100)}...
            </p>
            <div className={styles.meta} style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <div className={styles.metaItem} style={{ color: 'var(--primary-color)', fontWeight: 500 }}>
                Đọc bài viết →
              </div>
            </div>
          </Link>
        ))}
        {reviews.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            Chưa có bài review nào trong hệ thống.
          </p>
        )}
      </div>
    </FilterLayout>
  );
}
