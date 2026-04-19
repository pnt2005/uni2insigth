import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "../nganh-hoc/page.module.css";

export default function BlogList() {
  const blogs = [
    { title: "So sánh Đại học FPT và HUTECH: Chọn trường nào?", slug: "so-sanh-fpt-va-hutech", author: "UniInsight", date: "15/03/2026" },
    { title: "Top 5 ngành dễ kiếm việc thuật khối D năm 2026", slug: "top-5-nganh-de-kiem-viec-khoi-d", author: "Career Team", date: "12/03/2026" },
    { title: "Review chân thực về cuộc sống sinh viên Làng Đại Học", slug: "review-cuoc-song-lang-dai-hoc", author: "Sinh viên năm 3", date: "10/03/2026" },
  ];

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
