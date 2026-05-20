import { Metadata } from "next";
import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Cẩm Nang Hướng Nghiệp & Kinh Nghiệm Đại Học | Uni2Insight',
  description: 'Các bài viết chia sẻ kinh nghiệm, định hướng nghề nghiệp và đời sống sinh viên.',
  alternates: {
    canonical: '/blog',
  },
};
import styles from "../nganh-hoc/page.module.css";

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import TopFilterBar from '../../components/Common/TopFilterBar';

export default async function BlogList({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.toLowerCase() : '';
  const category = typeof params.cat === 'string' ? params.cat : 'Tất cả';

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
          author: data.author || "Uni2Insight Team",
          date: data.date || "Cập nhật mới",
          category: data.category || "Tin Tức",
          thumbnail: data.thumbnail || null
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateB - dateA;
      });
  } catch (error) {
    console.error("Lỗi khi đọc file blog", error);
  }

  const categoriesSet = new Set<string>();
  blogs.forEach(b => categoriesSet.add(b.category));
  const filterOptions = Array.from(categoriesSet);

  const filteredBlogs = blogs.filter(b => {
    const matchQuery = !query || b.title.toLowerCase().includes(query) || b.slug.toLowerCase().includes(query);
    const matchCat = category === 'Tất cả' || b.category === category;
    return matchQuery && matchCat;
  });

  return (
    <FilterLayout
      title="Blog & Hướng Nghiệp"
      subtitle="Các bài viết chia sẻ kinh nghiệm, định hướng nghề nghiệp và đời sống sinh viên."
      filters={<TopFilterBar placeholder="Tìm kiếm bài viết..." filterOptions={filterOptions} filterLabel="Danh mục" />}
    >
      <div className={styles.grid}>
        {filteredBlogs.map((blog, idx) => (
          <Link href={`/blog/${blog.slug}`} key={idx} className={styles.card}>
            <div style={{ position: 'relative', height: '150px', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', margin: '-1.5rem -1.5rem 1rem -1.5rem', overflow: 'hidden', background: 'var(--border)' }}>
              {blog.thumbnail && (
                <Image 
                  src={blog.thumbnail} 
                  alt={blog.title} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              )}
            </div>
            <div className={styles.cardHeader}>
              <span className={styles.category}>{blog.category}</span>
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
        {filteredBlogs.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Không tìm thấy bài viết nào phù hợp.
          </p>
        )}
      </div>
    </FilterLayout>
  );
}
