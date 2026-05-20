import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import styles from "./Home.module.css";
import { Metadata } from "next";
import Script from "next/script";
import { Monitor, BarChart2, Stethoscope, Pen, Languages } from "lucide-react";
import HeroSearch from "@/components/HeroSearch/HeroSearch";
import HeroVisual from "@/components/HeroVisual/HeroVisual";

export const metadata: Metadata = {
  title: 'Uni2Insight - Nền Tảng Tra Cứu Điểm Chuẩn & Học Phí Đại Học',
  description: 'Tra cứu thông tin tuyển sinh, điểm chuẩn lịch sử, học phí, đánh giá chi tiết và cẩm nang kinh nghiệm cho học sinh, phụ huynh và sinh viên.',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'rAZCVDkJ5EB2KKZGcv2_wTO8AdF3SPfersuYl55X0Eg',
  },
};

const FEATURED_MAJORS = [
  {
    Icon: Monitor,
    name: 'Công Nghệ TT',
    href: '/nganh-hoc/cong-nghe-thong-tin',
    badge: 'Hot',
  },
  {
    Icon: BarChart2,
    name: 'Kinh Tế',
    href: '/nganh-hoc/quan-tri-kinh-doanh',
    badge: 'Phổ biến',
  },
  {
    Icon: Stethoscope,
    name: 'Y Dược',
    href: '/nganh-hoc/y-khoa',
    badge: 'Mới',
  },
  {
    Icon: Pen,
    name: 'Thiết Kế',
    href: '/nganh-hoc/thiet-ke-do-hoa',
    badge: 'Sáng tạo',
  },
  {
    Icon: Languages,
    name: 'Ngôn Ngữ',
    href: '/nganh-hoc/ngon-ngu-anh',
    badge: 'Quốc tế',
  },
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
      image: u.image || "/images/beauty_img.jpg",
      reviews: Math.floor(Math.random() * 500) + 500, // Sinh số ngẫu nhiên demo
      rating: (Math.random() * 0.5 + 4.5).toFixed(1) // 4.5 -> 5.0
    }));
  } catch (e) { }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Uni2Insight",
    "url": "https://uni2insight.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://uni2insight.com/search-hub?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Uni2Insight",
    "url": "https://uni2insight.com",
    "logo": "https://uni2insight.com/favicon.ico",
    "description": "Nền tảng review và tra cứu thông tin trường đại học, ngành học hàng đầu Việt Nam"
  };

  return (
    <>
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Script id="ahrefs-analytics" strategy="afterInteractive">
        {`
          var ahrefs_analytics_script = document.createElement('script');
          ahrefs_analytics_script.async = true;
          ahrefs_analytics_script.src = 'https://analytics.ahrefs.com/analytics.js';
          ahrefs_analytics_script.setAttribute('data-key', 'fsyFx2m76CRDLcB1ImMHWQ');
          document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
        `}
      </Script>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Khám phá <span className={styles.heroTitleGradient}>tương lai</span> của bạn
            </h1>
            <p className={styles.heroSubtitle}>
              Tìm kiếm trường đại học, ngành học, điểm chuẩn và đánh giá thực tế từ sinh viên
            </p>
            <HeroSearch />

          </div>

          <HeroVisual />
        </div>
      </section>

      <div className="container" style={{ marginTop: '3rem' }}>
        {/* News Ticker */}
        <div className={styles.newsTicker}>
          <div className={styles.tickerContent}>
            🔥 Bộ GD&ĐT công bố quy chế tuyển sinh 2026 | 🌟 ĐH Bách Khoa HCM mở thêm 3 ngành mới | 💡 Học bổng 100% từ RMIT đang mở đơn
          </div>
        </div>

        {/* Quick Access */}
        <section className={styles.quickAccess}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Ngành Học Nổi Bật</h2>
            <p className={styles.sectionSubtitle}>Khám phá các ngành học đang được quan tâm nhất hiện nay</p>
          </div>
          <div className={styles.iconGrid}>
            {FEATURED_MAJORS.map((item, idx) => (
              <Link href={item.href} key={idx} className={styles.iconCard}>
                <div style={{ position: 'relative', alignSelf: 'flex-start', marginBottom: '1rem' }}>
                  <div className={styles.iconWrapper}>
                    <item.Icon size={24} strokeWidth={1.75} />
                  </div>
                </div>
                <span className={styles.iconLabel}>{item.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Schools */}
        <section className={styles.topSchools}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Top Trường Được Quan Tâm Nhất</h2>
            <p className={styles.sectionSubtitle}>Danh sách các trường đại học hàng đầu dựa trên đánh giá của sinh viên</p>
          </div>
          <div className={styles.schoolGrid}>
            {topSchools.map((school, idx) => (
              <Link href={`/review/${school.id}`} key={idx} className={styles.schoolCard}>
                <div className={styles.schoolImage}>
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
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Giới thiệu Nền tảng */}
        <section style={{ marginBottom: '3rem', padding: '2.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            Giới thiệu Nền tảng Tra cứu & Hướng nghiệp Uni2Insight
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Chào mừng bạn đến với <strong>Uni2Insight</strong> - Nền tảng tổng hợp, tra cứu thông tin và review trường đại học, ngành học hàng đầu tại Việt Nam. Chúng tôi ra đời với sứ mệnh cung cấp một không gian chia sẻ thông tin khách quan, chân thực và toàn diện, giúp các bạn học sinh THPT và sinh viên có thể định hướng nghề nghiệp một cách đúng đắn và tự tin nhất.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Tại Uni2Insight, bạn sẽ tìm thấy kho dữ liệu phong phú được cập nhật liên tục về cơ sở vật chất, chất lượng giảng dạy, học phí thực tế cùng môi trường học tập của hàng trăm trường Đại học trên khắp cả nước. Ngoài ra, nền tảng còn cung cấp các công cụ hướng nghiệp khoa học như trắc nghiệm tính cách MBTI, mật mã Holland và hệ thống cẩm nang ôn thi THPT Quốc gia hiệu quả. Những công cụ này hỗ trợ đắc lực giúp bạn thấu hiểu điểm mạnh, điểm yếu và sở thích nghề nghiệp cá nhân để chọn được ngành học phù hợp.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            Chúng tôi hy vọng Uni2Insight sẽ trở thành người bạn đồng hành đáng tin cậy trên hành trình chinh phục tri thức và định hình tương lai sự nghiệp của bạn. Hãy cùng chúng tôi khai phá tiềm năng học thuật của riêng bạn ngay hôm nay!
          </p>
        </section>
      </div>
    </>
  );
}
