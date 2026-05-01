import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import styles from "../../Review.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc';
import InternalLink from '../../../../components/InternalLink/InternalLink';

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

  const defSlugs = ['hoc-phi', 'chuong-trinh', 'co-hoi-viec-lam', 'diem-chuan'];
  const params = [];

  for (const school of schools) {
    const schoolDir = path.join(reviewsDir, school);

    // Đọc tất cả các file MDX nếu trường đã tạo thư mục con
    if (fs.existsSync(schoolDir) && fs.statSync(schoolDir).isDirectory()) {
      const slugs = fs.readdirSync(schoolDir)
        .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
        .map(f => f.replace(/\.mdx?$/, ''));

      for (const slug of slugs) {
        params.push({ school, slug });
      }
    } else {
      // Nếu chưa có, vẫn generate ra các URL mặc định trên thanh sidebar để người dùng bấm vào không bị Lỗi Server (chỉ hiện trang Fallback)
      for (const slug of defSlugs) {
        params.push({ school, slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ school: string, slug: string }> }) {
  const resolvedParams = await params;
  const { school, slug } = resolvedParams;

  const mdxPath = path.join(process.cwd(), 'data/reviews', school, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data } = matter(fileContent);
    if (data.title) {
      return { 
        title: data.title,
        alternates: {
          canonical: `/review/${school}/${slug}`,
        },
      };
    }
  }

  const schoolName = "Đại học " + school.replace(/-/g, ' ').toUpperCase();
  let title = `Thông tin chi tiết ${schoolName}`;
  if (slug === 'hoc-phi') title = `Học phí ${schoolName}`;
  else if (slug === 'chuong-trinh') title = `Chương trình đào tạo ${schoolName}`;
  else if (slug === 'co-hoi-viec-lam') title = `Cơ hội việc làm ${schoolName}`;
  else if (slug === 'diem-chuan') title = `Điểm chuẩn ${schoolName}`;

  return { 
    title,
    alternates: {
      canonical: `/review/${school}/${slug}`,
    },
  };
}

export default async function SubArticlePage({ params }: { params: Promise<{ school: string, slug: string }> }) {
  const resolvedParams = await params;
  const { school, slug } = resolvedParams;

  const schoolName = "Đại học " + school.replace(/-/g, ' ').toUpperCase();
  const mdxPath = path.join(process.cwd(), 'data/reviews', school, `${slug}.mdx`);

  // NẾU CÓ BÀI VIẾT .MDX CỤ THỂ -> RENDER NÓ
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContent);

    // Bắt buộc khai báo GFM ngay trong scope nếu next-mdx-remote version 6 bắt import động hoặc để an toàn
    const remarkGfm = (await import('remark-gfm')).default;

    return (
      <article className={styles.article}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href={`/review/${school}`} style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
            ← Quay lại bài review {data.name || schoolName}
          </Link>
        </div>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.content}>
          <MDXRemote
            source={content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            components={{
              InternalLink,
              img: (props: any) => (
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0', width: '100%' }}>
                  <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', display: 'block', objectFit: 'contain' }} />
                  {props.alt && (
                    <em style={{ display: 'block', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                      {props.alt}
                    </em>
                  )}
                </span>
              )
            }}
          />
        </div>
      </article>
    );
  }

  // NẾU CHƯA CÓ BÀI VIẾT (Xóa toàn bộ hardcode cũ, chỉ giữ thông báo mặc định)
  return (
    <article className={styles.article}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href={`/review/${school}`} style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại bài review {schoolName}
        </Link>
      </div>

      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>✍️</span>
        <h1 className={styles.title} style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          Bài viết chi tiết đang được cập nhật
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Nội dung chuyên sâu về phân mục này cho {schoolName} hiện đang được đội ngũ ban biên tập Uni2Insight tổng hợp và sẽ ra mắt trong thời gian sớm nhất.
        </p>
      </div>
    </article>
  );
}
