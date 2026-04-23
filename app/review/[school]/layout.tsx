import Link from "next/link";
import styles from "./layout.module.css";
// Giả sử file json của bạn để ở thư mục /data/schools.json
import schoolsData from "@/data/universities.json";

export default async function ReviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ school: string }>;
}) {
  const resolvedParams = await params;
  const schoolSlug = resolvedParams.school;

  // 1. Tìm object trường trong file JSON dựa trên slug
  const currentSchool = schoolsData.find((school) => school.id === schoolSlug);

  // 2. Lấy name. Nếu vì lý do nào đó không tìm thấy trong JSON, 
  // ta fallback (dự phòng) bằng cách format lại slug để giao diện không bị lỗi trống.
  const schoolName = currentSchool
    ? currentSchool.name
    : schoolSlug.replace(/-/g, ' ').toUpperCase();

  return (
    <div className={`container ${styles.reviewLayout}`}>
      <main className={styles.mainContent}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li><Link href="/">Trang chủ</Link></li>
            <li><span className={styles.separator} aria-hidden="true">/</span></li>
            <li><Link href="/review">Review Trường</Link></li>
            <li><span className={styles.separator} aria-hidden="true">/</span></li>
            <li aria-current="page" className={styles.currentObj}>
              {/* Hiển thị tên trường thật lấy từ JSON */}
              {schoolName}
            </li>
          </ol>
        </nav>

        {children}
      </main>

      <aside className={styles.sidebar}>
        <div className={styles.stickyBox}>
          <nav className={styles.spokeNav} aria-label="Khám phá các chủ đề khác">
            <h3 className={styles.sidebarTitle}>Nội Dung Khám Phá</h3>
            <ul className={styles.spokeList}>
              <li>
                <Link href={`/review/${schoolSlug}`} className={styles.spokeLink}>
                  Tổng quan {schoolName}
                </Link>
              </li>
              <li>
                <Link href={`/review/${schoolSlug}/chuong-trinh`} className={styles.spokeLink}>
                  Chương trình đào tạo
                </Link>
              </li>
              <li>
                <Link href={`/review/${schoolSlug}/hoc-phi`} className={styles.spokeLink}>
                  Học phí chi tiết
                </Link>
              </li>
              <li>
                <Link href={`/review/${schoolSlug}/diem-chuan`} className={styles.spokeLink}>
                  Điểm chuẩn các năm
                </Link>
              </li>
              <li>
                <Link href={`/review/${schoolSlug}/co-hoi-viec-lam`} className={styles.spokeLink}>
                  Cơ hội việc làm
                </Link>
              </li>
            </ul>
          </nav>

          {/* <nav className={styles.toc} aria-label="Mục lục bài viết">
            <h3 className={styles.sidebarTitle}>Mục Lục (TOC)</h3>
            <ul className={styles.tocList}>
              <li><a href="#gioi-thieu">1. Giới thiệu chung</a></li>
              <li><a href="#chuong-trinh">2. Chương trình đào tạo</a></li>
              <li><a href="#co-hoi">3. Cơ hội việc làm</a></li>
              <li><a href="#faq">4. Câu hỏi thường gặp (FAQ)</a></li>
            </ul>
          </nav> */}
        </div>
      </aside>
    </div>
  );
}