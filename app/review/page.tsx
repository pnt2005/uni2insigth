import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import FilterLayout from '../../components/Common/FilterLayout';
import TopFilterBar from '../../components/Common/TopFilterBar';
import styles from '../nganh-hoc/page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review Đánh Giá Các Trường Đại Học | Uni2Insight',
  description: 'Góc nhìn thực tế, bài review chi tiết về giảng viên, cơ sở vật chất, học phí từ sinh viên các trường đại học.',
  keywords: ['review', 'review trường', 'đánh giá trường', 'đánh giá đại học', 'uni2insight'],
  alternates: {
    canonical: '/review',
  },
};

export default async function ReviewIndex({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.toLowerCase() : '';

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

  const filteredReviews = reviews.filter(r => {
    return !query || r.title.toLowerCase().includes(query) || r.schoolName.toLowerCase().includes(query) || r.slug.toLowerCase().includes(query);
  });

  return (
    <FilterLayout 
      filters={<TopFilterBar placeholder="Tìm kiếm trường đại học..." />}
    >
      <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Góc Nhìn Thực Tế — Đánh Giá & Review Trường Đại Học
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Chào mừng bạn đến với chuyên mục <strong>Review Trường Đại học</strong> của Uni2Insight. Quyết định lựa chọn trường đại học là một trong những bước ngoặt quan trọng nhất của cuộc đời học sinh. Để đưa ra quyết định đúng đắn, bên cạnh các thông số kỹ thuật như điểm chuẩn tuyển sinh hay học phí công bố, những trải nghiệm thực tế từ cộng đồng sinh viên và cựu sinh viên đi trước là nguồn tham khảo vô giá. Chuyên mục này được xây dựng với mục tiêu cung cấp những góc nhìn khách quan, đa chiều và chân thực nhất về môi trường học tập, cơ sở vật chất, hoạt động phong trào và cơ hội phát triển bản thân tại từng trường đại học, học viện trên khắp cả nước.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Tại đây, bạn sẽ tìm thấy những bài viết đánh giá sâu sắc về mọi khía cạnh của đời sống sinh viên. Từ chất lượng giảng dạy của đội ngũ giảng viên, độ hiện đại của phòng thí nghiệm, thư viện cho đến tính năng động của các câu lạc bộ ngoại khóa và mạng lưới hỗ trợ việc làm của nhà trường. Chúng tôi tin rằng, mỗi ngôi trường đều có những thế mạnh nổi bật riêng biệt và những hạn chế cần cải thiện. Hiểu rõ những điều này sẽ giúp các bạn học sinh có sự chuẩn bị tâm lý vững vàng, tránh những cú sốc văn hóa học đường và nhanh chóng hòa nhập với môi trường mới.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          Uni2Insight luôn nỗ lực làm cầu nối đáng tin cậy giữa các thế hệ sinh viên, cùng nhau chia sẻ kiến thức và kinh nghiệm hữu ích để chắp cánh cho tương lai. Hãy bắt đầu tìm kiếm tên trường đại học mà bạn quan tâm tại thanh bộ lọc bên dưới để khám phá ngay những bài viết review chân thực nhất!
        </p>
      </div>

      <div className={styles.grid}>
        {filteredReviews.map((review, idx) => (
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
        {filteredReviews.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Không tìm thấy bài review nào phù hợp.
          </p>
        )}
      </div>
    </FilterLayout>
  );
}
