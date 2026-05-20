import { Metadata } from "next";
import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Blog Cẩm Nang Hướng Nghiệp & Kinh Nghiệm Đại Học | Uni2Insight',
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
    <FilterLayout>
      <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>Chào mừng bạn đến với Blog Hướng nghiệp & Kinh nghiệm Học đường Uni2Insight</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Trang Blog và Hướng nghiệp của Uni2Insight là nơi tổng hợp những bài viết chia sẻ kinh nghiệm học đường, định hướng nghề nghiệp và cẩm nang bổ ích dành cho học sinh, sinh viên. Tại đây, bạn sẽ tìm thấy các bài viết phân tích, đánh giá khách quan về cơ sở vật chất của các trường Đại học trên khắp cả nước, bao gồm không gian phòng học, thư viện, ký túc xá, và các tiện ích học tập khác. Những bài viết thực tế này được tổng hợp từ trải nghiệm của các cựu sinh viên đi trước, nhằm mang lại góc nhìn chân thực nhất giúp bạn đưa ra lựa chọn trường học phù hợp với bản thân.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Bên cạnh thông tin về cơ sở vật chất các trường đại học lớn như Đại học Y Hà Nội, Đại học Y Dược TP.HCM, VinUni, FPT, RMIT hay các trường công lập khác, góc hướng nghiệp của chúng tôi còn cung cấp các bài viết chuyên sâu về định hướng nghề nghiệp thông qua các phương pháp khoa học như trắc nghiệm tính cách MBTI và mật mã Holland. Những công cụ này sẽ hỗ trợ bạn thấu hiểu điểm mạnh, điểm yếu và xu hướng nghề nghiệp của chính mình để chọn được ngành học phù hợp.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          Đồng thời, trang blog cũng thường xuyên cập nhật những kinh nghiệm học tập thực tế, bí quyết ôn thi THPT Quốc gia hiệu quả, các phương pháp quản lý thời gian và mẹo nhỏ giúp giảm bớt áp lực tâm lý trong mùa thi cử. Chúng tôi hy vọng Uni2Insight sẽ trở thành người bạn đồng hành đáng tin cậy trên con đường định hướng tương lai và chinh phục ước mơ học đường của bạn. Hãy thường xuyên ghé thăm để cập nhật thêm nhiều kiến thức và tin tức bổ ích nhé!
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <TopFilterBar placeholder="Tìm kiếm bài viết..." filterOptions={filterOptions} filterLabel="Danh mục" />
      </div>

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
