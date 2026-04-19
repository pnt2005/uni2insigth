import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "../nganh-hoc/page.module.css";

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function BlogList() {
  const blogDir = path.join(process.cwd(), 'data/blog');
  let blogs: any[] = [];
  
  try {
    const filenames = fs.readdirSync(blogDir);
    blogs = filenames
      .filter((filename) => (filename.endsWith('.md') || filename.endsWith('.mdx')) && !filename.startsWith('_'))
      .map((filename) => {
        const filePath = path.join(blogDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        return {
          slug: filename.replace(/\.mdx?$/, ''),
          title: data.title || "Bài Viết Blog",
          author: data.author || "UniInsight Team",
          date: data.date || "Cập nhật mới",
          category: data.category || "Tin Tức"
        };
      });
  } catch (error) {
    console.error("Lỗi khi đọc file blog", error);
  }
  return (
    <FilterLayout 
      title="Blog & Hướng Nghiệp" 
      subtitle="Các bài viết chia sẻ kinh nghiệm, định hướng nghề nghiệp và đời sống sinh viên."
    >
      <div className={styles.grid}>
        {blogs.map((blog, idx) => (
          <Link href={`/blog/${blog.slug}`} key={idx} className={styles.card}>
            <div style={{ height: '150px', background: 'var(--border)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', margin: '-1.5rem -1.5rem 1rem -1.5rem' }}></div>
            <div className={styles.cardHeader}>
              <span className={styles.category}>Hướng nghiệp</span>
            </div>
            <h3 className={styles.title}>{blog.title}</h3>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                Tác giả: {blog.author}
              </div>
              <div className={styles.metaItem}>
                Ngày đăng: {blog.date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </FilterLayout>
  );
}
