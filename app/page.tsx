import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Khám phá tương lai của bạn</h1>
          <p className={styles.heroSubtitle}>
            Tìm kiếm trường đại học, ngành học, điểm chuẩn và đánh giá thực tế từ sinh viên
          </p>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Nhập tên trường, mã trường hoặc ngành học..." 
            />
            <button className={styles.searchButton}>Tìm kiếm</button>
          </div>
        </div>
      </section>

      <div className="container">
        {/* News Ticker */}
        <div className={styles.newsTicker}>
          <span className={styles.newsLabel}>Tin Mới</span>
          <div className={styles.tickerContent}>
            🔥 Bộ GD&ĐT công bố quy chế tuyển sinh 2026 | 🌟 ĐH Bách Khoa HCM mở thêm 3 ngành mới | 💡 Học bổng 100% từ RMIT đang mở đơn
          </div>
        </div>

        {/* Quick Access */}
        <section className={styles.quickAccess}>
          <h2 className={styles.sectionTitle}>Ngành Học Nổi Bật</h2>
          <div className={styles.iconGrid}>
            {[
              { icon: '💻', name: 'CNTT', href: '/nganh-hoc/ky-thuat-cong-nghe/cong-nghe-thong-tin' },
              { icon: '📊', name: 'Kinh Tế', href: '/nganh-hoc/kinh-doanh-quan-ly' },
              { icon: '🏥', name: 'Y Dược', href: '/nganh-hoc/y-duoc' },
              { icon: '🎨', name: 'Thiết Kế', href: '/nganh-hoc/nghe-thuat-thiet-ke' },
              { icon: '🗣️', name: 'Ngôn Ngữ', href: '/nganh-hoc/ngon-ngu' }
            ].map((item, idx) => (
              <Link href={item.href} key={idx} className={styles.iconCard}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <span className={styles.iconLabel}>{item.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Schools */}
        <section className={styles.topSchools}>
          <h2 className={styles.sectionTitle}>Top Trường Được Quan Tâm Nhất</h2>
          <div className={styles.schoolGrid}>
            {[
              { name: 'Đại học FPT', reviews: 1250, rating: 4.8, type: 'Tư thục' },
              { name: 'Đại học Bách Khoa HCM', reviews: 980, rating: 4.9, type: 'Công lập' },
              { name: 'Đại học Kinh tế Quốc dân', reviews: 850, rating: 4.7, type: 'Công lập' },
              { name: 'Đại học RMIT', reviews: 720, rating: 4.9, type: 'Quốc tế' },
            ].map((school, idx) => (
              <Link href={`/review/${school.name.toLowerCase().replace(/ /g, '-')}`} key={idx} className={styles.schoolCard}>
                <div className={styles.schoolImage}>🏫</div>
                <div className={styles.schoolInfo}>
                  <h3 className={styles.schoolName}>{school.name}</h3>
                  <div className={styles.schoolMeta}>
                    <span>{school.type}</span>
                    <span>•</span>
                    <span>{school.reviews} Reviews</span>
                  </div>
                  <div className={styles.schoolRating}>
                    ★ {school.rating}/5.0
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
