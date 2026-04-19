import Link from "next/link";
import styles from "./layout.module.css";

export default async function ReviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ school: string }>;
}) {
  const resolvedParams = await params;
  const schoolName = resolvedParams.school.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className={`container ${styles.reviewLayout}`}>
      <main className={styles.mainContent}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li><Link href="/">Trang chủ</Link></li>
            <li><span className={styles.separator}>/</span></li>
            <li><Link href="/review">Review Trường</Link></li>
            <li><span className={styles.separator}>/</span></li>
            <li aria-current="page" className={styles.currentObj}>{schoolName}</li>
          </ol>
        </nav>

        {children}
      </main>

      <aside className={styles.sidebar}>
        <div className={styles.stickyBox}>
          <div className={styles.spokeNav}>
            <h3 className={styles.sidebarTitle}>Nội Dung Khám Phá</h3>
            <ul className={styles.spokeList}>
              <li>
                <Link href={`/review/${resolvedParams.school}`} className={styles.spokeLink}>
                  👉 Tổng quan {schoolName}
                </Link>
              </li>
              <li>
                <Link href={`/review/${resolvedParams.school}/hoc-phi`} className={styles.spokeLink}>
                  💰 Học phí chi tiết
                </Link>
              </li>
              <li>
                <Link href={`/review/${resolvedParams.school}/diem-chuan`} className={styles.spokeLink}>
                  🎯 Điểm chuẩn các năm
                </Link>
              </li>
              <li>
                <Link href={`/review/${resolvedParams.school}/co-so-vat-chat`} className={styles.spokeLink}>
                  🏢 Cơ sở vật chất & KTX
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.toc}>
            <h3 className={styles.sidebarTitle}>Mục Lục (TOC)</h3>
            <ul className={styles.tocList}>
              <li><a href="#gioi-thieu">1. Giới thiệu chung</a></li>
              <li><a href="#chuong-trinh">2. Chương trình đào tạo</a></li>
              <li><a href="#co-hoi">3. Cơ hội việc làm</a></li>
              <li><a href="#faq">4. Câu hỏi thường gặp (FAQ)</a></li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
