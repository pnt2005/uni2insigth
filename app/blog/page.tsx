import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import Image from "next/image";
import styles from "../nganh-hoc/page.module.css";
import filterStyles from "../../components/Common/FilterLayout.module.css";

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
          author: data.author || "Uni2Insight Team",
          date: data.date || "Cập nhật mới",
          category: data.category || "Tin Tức",
          thumbnail: data.thumbnail || null
        };
      });
  } catch (error) {
    console.error("Lỗi khi đọc file blog", error);
  }
  const customFilters = (
    <>
      <div className={filterStyles.filterGroup}>
        <label className={filterStyles.filterLabel}>Chuyên Mục</label>
        <select className={filterStyles.select}>
          <option value="">Tất cả chuyên mục</option>
          <option value="tu-van">Tư vấn chọn trường</option>
          <option value="huong-nghiep">Định hướng nghề nghiệp</option>
          <option value="doi-song">Đời sống sinh viên</option>
        </select>
      </div>

      <div className={filterStyles.filterGroup}>
        <label className={filterStyles.filterLabel}>Sắp Xếp Dữ Liệu</label>
        <div className={filterStyles.checkboxGroup}>
          <label className={filterStyles.checkboxLabel}>
            <input type="radio" name="sort" defaultChecked /> Mới nhất
          </label>
          <label className={filterStyles.checkboxLabel}>
            <input type="radio" name="sort" /> Xem nhiều nhất
          </label>
        </div>
      </div>
    </>
  );

  return (
    <FilterLayout
      title="Blog & Hướng Nghiệp"
      subtitle="Các bài viết chia sẻ kinh nghiệm, định hướng nghề nghiệp và đời sống sinh viên."
      filters={customFilters}
    >
      <div className={styles.grid}>
        {blogs.map((blog, idx) => (
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
      </div>
    </FilterLayout>
  );
}
