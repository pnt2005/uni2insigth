import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from "next/link";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'data/blog');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(blogDir);
  } catch (error) {
    return [];
  }

  return filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => ({
      slug: filename.replace(/\.mdx$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const mdxPath = path.join(process.cwd(), 'data/blog', `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data } = matter(fileContent);
    if (data.title) return { title: data.title };
  }

  return { title: slug.replace(/-/g, ' ').toUpperCase() };
}

export default async function BlogDeepPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const titlePath = slug.replace(/-/g, ' ').toUpperCase();

  const mdxPath = path.join(process.cwd(), 'data/blog', `${slug}.mdx`);

  // NẾU CÓ BÀI VIẾT .MDX CỤ THỂ -> RENDER NÓ
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContent);
    const remarkGfm = (await import('remark-gfm')).default;

    return (
      <div className={styles.container}>
        <article className={styles.article}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/blog" style={{ display: 'inline-block', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
            ← Quay lại Blog Danh mục
          </Link>
        </div>

        <h1 className={styles.title}>
          {data.title || titlePath}
        </h1>
        
        <div className={styles.metaInfo}>
          <span>Đăng lúc: {data.date || 'Cập nhật mới nhất 2026'}</span> • <span>Tác giả: {data.author || 'UniInsight Team'}</span>
        </div>

        <div className={styles.content}>
          <MDXRemote 
            source={content} 
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} 
            components={{
              img: (props: any) => (
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1.5rem 0' }}>
                  <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }} />
                  {props.alt && (
                    <em style={{ display: 'block', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      {props.alt}
                    </em>
                  )}
                </span>
              )
            }}
          />
        </div>

        <div className={styles.subscribeBox}>
          <h3>Đăng ký nhận thông báo</h3>
          <p>Nhận bài viết phân tích ngành mới nhất qua email.</p>
          <div className={styles.subscribeForm}>
            <input type="email" placeholder="Email của bạn..." className={styles.subscribeInput} />
            <button className={styles.subscribeBtn}>Đăng ký</button>
          </div>
        </div>
      </article>
      </div>
    );
  }

  // NẾU CHƯA CÓ BÀI VIẾT .MDX
  return (
    <div className={styles.container}>
      <article className={styles.article}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/blog" style={{ display: 'inline-block', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại Blog Danh mục
        </Link>
      </div>

      <h1 className={styles.title}>
        {titlePath}
      </h1>
      
      <div className={styles.metaInfo}>
        <span>Đăng lúc: Cập nhật mới nhất 2026</span> • <span>Tác giả: UniInsight Team</span>
      </div>

      <div className={styles.content}>
        <p>
          Xin chào! Bạn đang truy cập bài viết <strong>{titlePath}</strong>. 
          Hiện tại tính năng Blog chi tiết đang trong giai đoạn phát triển nội dung và hệ thống CMS.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Đội ngũ nội dung của UniInsight sẽ sớm cập nhật bài viết này với những phân tích chuyên sâu về thị trường lao động, xu hướng ngành nghề, và các số liệu báo cáo tin cậy nhất. Vui lòng đón chờ!
        </p>
      </div>

      <div className={styles.subscribeBox}>
        <h3>Đăng ký nhận thông báo</h3>
        <p>Nhận bài viết phân tích ngành mới nhất qua email.</p>
        <div className={styles.subscribeForm}>
          <input type="email" placeholder="Email của bạn..." className={styles.subscribeInput} />
          <button className={styles.subscribeBtn}>Đăng ký</button>
        </div>
      </div>
    </article>
    </div>
  );
}
