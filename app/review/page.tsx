import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import FilterLayout from '../../components/Common/FilterLayout';
import styles from '../nganh-hoc/page.module.css';

export default async function ReviewIndex() {
  const reviewsDir = path.join(process.cwd(), 'data/reviews');
  let reviews: Array<{ slug: string, title: string, schoolName: string, description: string, image: string }> = [];
  
  let unisData: any[] = [];
  try {
    const unisStr = fs.readFileSync(path.join(process.cwd(), 'data/universities.json'), 'utf8');
    unisData = JSON.parse(unisStr);
  } catch(e) {}

  try {
    const filenames = fs.readdirSync(reviewsDir);
    reviews = filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .filter((filename) => !filename.startsWith('_'))
      .map((filename) => {
        const filePath = path.join(reviewsDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        const slug = filename.replace(/\.mdx$/, '');
        const uniInfo = unisData.find(u => u.id === slug);
        
        return {
          slug,
          title: data.title || "Bài Review Trường",
          schoolName: data.schoolName || uniInfo?.name || "Đại học",
          description: data.description || "Nhấn vào để xem chi tiết bài đánh giá toàn diện về trường đại học này.",
          image: uniInfo?.image || "/images/unnamed.jpg"
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
          <Link href={`/review/${review.slug}`} key={idx} className={styles.card} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              position: 'relative',
              height: '180px',
              margin: '-1.5rem -1.5rem 1.5rem -1.5rem',
              backgroundColor: 'var(--border)',
              borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
              overflow: 'hidden'
            }}>
              <Image 
                src={review.image}
                alt={`Ảnh đại diện review trường ${review.schoolName}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.cardHeader}>
              <span className={styles.category}>Review Chi Tiết</span>
            </div>
            <h3 className={styles.title} style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              {review.schoolName}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', flex: 1 }}>
              {review.description.substring(0, 100)}...
            </p>
            <div className={styles.meta} style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <div className={styles.metaItem} style={{ color: 'var(--primary)', fontWeight: 500 }}>
                Đọc bài viết →
              </div>
            </div>
          </Link>
        ))}
        {reviews.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Chưa có bài review nào trong hệ thống.
          </p>
        )}
      </div>
    </FilterLayout>
  );
}
