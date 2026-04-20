import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import styles from "./Home.module.css";

const FEATURED_MAJORS = [
  { icon: '💻', name: 'CNTT', href: '/nganh-hoc/ky-thuat-cong-nghe/cong-nghe-thong-tin' },
  { icon: '📊', name: 'Kinh Tế', href: '/nganh-hoc/kinh-doanh-quan-ly' },
  { icon: '🏥', name: 'Y Dược', href: '/nganh-hoc/y-duoc' },
  { icon: '🎨', name: 'Thiết Kế', href: '/nganh-hoc/nghe-thuat-thiet-ke' },
  { icon: '🗣️', name: 'Ngôn Ngữ', href: '/nganh-hoc/ngon-ngu' }
];

export default async function Home() {
  let topSchools: any[] = [];
  try {
    const unisPath = path.join(process.cwd(), 'data/universities.json');
    const unisContent = fs.readFileSync(unisPath, 'utf8');
    const parsedUnis = JSON.parse(unisContent);
    // Lấy 4 trường đầu tiên làm Top Schools
    topSchools = parsedUnis.slice(0, 9).map((u: any) => ({
      id: u.id,
      name: u.name || "Tên Trường",
      type: u.name.includes("Quốc gia") || u.name.includes("Bách Khoa") ? "Công lập" : "Tư thục/Quốc tế",
      image: u.image || "/images/fpt-logo.svg",
      reviews: Math.floor(Math.random() * 500) + 500, // Sinh số ngẫu nhiên demo
      rating: (Math.random() * 0.5 + 4.5).toFixed(1) // 4.5 -> 5.0
    }));
  } catch (e) { }

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
          {/* <span className={styles.newsLabel}>Tin Mới</span> */}
          <div className={styles.tickerContent}>
            🔥 Bộ GD&ĐT công bố quy chế tuyển sinh 2026 | 🌟 ĐH Bách Khoa HCM mở thêm 3 ngành mới | 💡 Học bổng 100% từ RMIT đang mở đơn
          </div>
        </div>

        {/* Quick Access */}
        <section className={styles.quickAccess}>
          <h2 className={styles.sectionTitle}>Ngành Học Nổi Bật</h2>
          <div className={styles.iconGrid}>
            {FEATURED_MAJORS.map((item, idx) => (
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
            {topSchools.map((school, idx) => (
              <Link href={`/review/${school.id}`} key={idx} className={styles.schoolCard}>
                <div className={styles.schoolImage} style={{ position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={school.image}
                    alt={`Hình ảnh ${school.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
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
