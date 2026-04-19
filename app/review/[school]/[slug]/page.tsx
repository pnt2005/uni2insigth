import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import styles from "../../Review.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const reviewsDir = path.join(process.cwd(), 'data/reviews');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(reviewsDir);
  } catch (error) {
    return [];
  }

  const schools = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => filename.replace(/\.mdx$/, ''));

  const subArticles = ['hoc-phi', 'chuong-trinh', 'co-hoi-viec-lam', 'diem-chuan'];

  const params = [];
  for (const school of schools) {
    for (const slug of subArticles) {
      params.push({ school, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ school: string, slug: string }> }) {
  const resolvedParams = await params;
  const { school, slug } = resolvedParams;
  const schoolName = "Đại học " + school.replace(/-/g, ' ').toUpperCase();
  
  let title = `Thông tin ${schoolName}`;
  if (slug === 'hoc-phi') title = `Học phí ${schoolName} năm 2026`;
  else if (slug === 'chuong-trinh') title = `Chương trình đào tạo ${schoolName}`;
  else if (slug === 'co-hoi-viec-lam') title = `Cơ hội việc làm ${schoolName}`;
  else if (slug === 'diem-chuan') title = `Điểm chuẩn ${schoolName}`;

  return { title };
}

export default async function SubArticlePage({ params }: { params: Promise<{ school: string, slug: string }> }) {
  const resolvedParams = await params;
  const { school, slug } = resolvedParams;
  
  // Verify main MDX exists
  const filePath = path.join(process.cwd(), 'data/reviews', `${school}.mdx`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  const schoolName = data.schoolName || ("Đại học " + school.replace(/-/g, ' ').toUpperCase());

  // Define some dummy dynamic content based on slug
  let title = "";
  let content = null;
  
  if (slug === 'hoc-phi') {
    title = `Chi tiết học phí ${schoolName} năm 2026`;
    content = (
      <>
        <div className={styles.metaTags}>
          <span className={styles.tag}>Học phí</span>
          <span className={styles.tag}>Cập nhật 2026</span>
        </div>
        <p>Học phí là một trong những yếu tố được phụ huynh và học sinh quan tâm hàng đầu khi lựa chọn <strong>{schoolName}</strong>.</p>
        <h2 id="gioi-thieu">1. Mức học phí chung</h2>
        <p>Mức học phí trung bình rơi vào khoảng 25.000.000 VNĐ đến 35.000.000 VNĐ một học kỳ, tùy loại chương trình chuẩn hay chất lượng cao.</p>
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
              <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Kinh tế - Quản lý</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>27.500.000 VNĐ</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else if (slug === 'chuong-trinh') {
    title = `Chương trình đào tạo ${schoolName}`;
    content = (
       <>
          <div className={styles.metaTags}>
            <span className={styles.tag}>Đào tạo</span>
            <span className={styles.tag}>Hệ chính quy</span>
          </div>
          <p>Chương trình học tại <strong>{schoolName}</strong> được thiết kế khoa học, thực tiễn và liên tục cập nhật theo tiêu chuẩn quốc tế.</p>
          <h2 id="gioi-thieu">1. Các hệ đào tạo</h2>
          <ul>
            <li>Hệ đại trà (Chuẩn quốc gia)</li>
            <li>Hệ chất lượng cao (Giảng dạy bằng tiếng Anh)</li>
            <li>Hệ liên kết quốc tế (Cấp bằng bởi đại học đối tác)</li>
          </ul>
       </>
    );
  } else if (slug === 'co-hoi-viec-lam') {
    title = `Cơ hội việc làm ${schoolName}`;
    content = (
      <>
          <div className={styles.metaTags}>
            <span className={styles.tag}>Hướng nghiệp</span>
            <span className={styles.tag}>Thực tập</span>
          </div>
          <p>Tỷ lệ sinh viên có việc làm ngay sau khi tốt nghiệp tại <strong>{schoolName}</strong> luôn nằm ở mức cao.</p>
          <h2 id="gioi-thieu">Cầu nối doanh nghiệp</h2>
          <p>Hàng năm trường tổ chức rất nhiều các ngày hội việc làm (Job Fairs), ký kết hợp tác với hàng trăm doanh nghiệp cả trong và ngoài nước giúp sinh viên có cơ hội thực tập ngay từ năm 3.</p>
      </>
    );
  } else if (slug === 'diem-chuan') {
    title = `Điểm chuẩn ${schoolName} qua các năm`;
    content = (
      <>
          <div className={styles.metaTags}>
            <span className={styles.tag}>Tuyển sinh</span>
            <span className={styles.tag}>Biến động điểm</span>
          </div>
          <p>Xem xét điểm chuẩn các năm trước là bước quan trọng giúp bạn an tâm đỗ đạt vào <strong>{schoolName}</strong>.</p>
          <h2 id="gioi-thieu">Phổ điểm xét tuyển</h2>
          <p>Nhìn chung, qua các năm từ 2023 - 2025, điểm đầu vào luôn ở mức ổn định từ 22 đến 28 điểm tùy ngành hot. Nhóm ngành Công nghệ thông tin và Công nghệ kỹ thuật Ô tô luôn đứng Top điểm chuẩn.</p>
      </>
    );
  } else {
    notFound();
  }

  return (
    <article className={styles.article}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href={`/review/${school}`} style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại bài review {schoolName}
        </Link>
      </div>

      <h1 className={styles.title}>{title}</h1>
      
      <div className={styles.content}>
        {content}
      </div>
    </article>
  );
}
