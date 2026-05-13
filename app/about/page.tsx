import type { Metadata } from 'next';
import Link from 'next/link';
import TeamCard from '../../components/TeamCard/TeamCard';
import StatCard from '../../components/StatCard/StatCard';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'Về chúng tôi — Uni2Insight',
  description: 'Tìm hiểu sứ mệnh, câu chuyện, đội ngũ và những con số ấn tượng của Uni2Insight — nền tảng thông tin tuyển sinh hàng đầu Việt Nam.',
  alternates: { canonical: '/about' },
};

const VALUES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Chính xác',
    desc: 'Dữ liệu kiểm chứng từ Bộ GD&ĐT và các trường đại học chính thức.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: 'Minh bạch',
    desc: 'Không quảng cáo che giấu thông tin. Dữ liệu luôn có nguồn rõ ràng.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Cộng đồng',
    desc: 'Xây dựng cùng học sinh, phụ huynh và chuyên gia giáo dục.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Đổi mới',
    desc: 'Ứng dụng AI và phân tích dữ liệu để cá nhân hóa hành trình chọn trường.',
  },
];

const TEAM = [
  { name: 'Lê Hoàng Thái', role: 'Đồng sáng lập & CEO', initials: 'LHT' },
  { name: 'Nguyễn Hiền Trân', role: 'Trưởng nhóm Dữ liệu', initials: 'NHT' },
  { name: 'Trần Thị Như Phương', role: 'Kỹ sư phần mềm', initials: 'TTNP' },
  { name: 'Nguyễn Ngọc Quyên', role: 'Thiết kế sản phẩm', initials: 'NNQ' },
  { name: 'Phan Nam Thanh', role: 'Thiết kế sản phẩm', initials: 'PNT' },
];

const STATS = [
  { value: '3,200+', label: 'Ngành học được lập chỉ mục', icon: '📚' },
  { value: '200+', label: 'Trường đại học trên cả nước', icon: '🏫' },
  { value: '500K+', label: 'Lượt truy cập mỗi tháng', icon: '📈' },
  { value: '98%', label: 'Độ chính xác dữ liệu điểm chuẩn', icon: '✅' },
];

export default function AboutPage() {
  return (
    <main>
      {/* ── 1. Hero / Mission ── */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Giúp mỗi học sinh Việt Nam<br />tìm đúng con đường của mình
        </h1>
        <p className={styles.heroSub}>
          Uni2Insight là nền tảng thông tin tuyển sinh toàn diện — cung cấp dữ liệu điểm chuẩn,
          học phí, ngành học và cơ hội nghề nghiệp từ hơn 200 trường đại học tại Việt Nam.
        </p>
      </section>

      {/* ── 2. Story ── */}
      <section className={styles.storySection}>
        <div className={styles.story}>
          <div className={styles.storyText}>
            <h2>Câu chuyện của chúng tôi</h2>
            <p>
              Uni2Insight ra đời năm 2023 từ trải nghiệm thực tế của những sinh viên từng phải
              tự mình lần mò thông tin điểm chuẩn qua hàng chục trang web khác nhau. Chúng tôi
              tin rằng mỗi học sinh đều xứng đáng có được thông tin rõ ràng, chính xác và dễ
              tiếp cận để đưa ra quyết định quan trọng nhất của cuộc đời.
            </p>
            <p>
              Từ một dự án nhỏ với dữ liệu của 30 trường, chúng tôi đã mở rộng để phủ sóng
              toàn bộ hệ thống giáo dục đại học Việt Nam, tích hợp thêm AI phân tích xu hướng
              tuyển sinh và công cụ so sánh ngành học thông minh.
            </p>
            <p>
              Hôm nay, Uni2Insight phục vụ hơn 500.000 lượt truy cập mỗi tháng, trở thành
              người bạn đồng hành đáng tin cậy trong hành trình chọn trường của hàng triệu
              học sinh và phụ huynh Việt Nam.
            </p>
          </div>
          <div className={styles.storyIllustration} aria-hidden="true">
            <div className={styles.illustrationBox}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true" style={{ opacity: 0.4 }}>
                <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
              </svg>
              <p>Dữ liệu từ Bộ GD&ĐT và 200+ trường đại học Việt Nam</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Values ── */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionHeader}>
          <h2>Giá trị cốt lõi</h2>
          <p>Những nguyên tắc định hướng mọi quyết định của chúng tôi.</p>
        </div>
        <div className={styles.valuesGrid}>
          {VALUES.map((v) => (
            <article key={v.title} className={styles.valueCard}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── 4. Team ── */}
      <section className={styles.teamSection}>
        <div className={styles.sectionHeader}>
          <h2>Đội ngũ sáng lập</h2>
          <p>Những con người đam mê giáo dục đứng sau Uni2Insight.</p>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </section>

      {/* ── 5. Stats ── */}
      <section className={styles.statsSection}>
        <div className={styles.sectionHeader}>
          <h2>Con số nói lên tất cả</h2>
        </div>
        <div className={styles.statsGrid}>
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section className={styles.cta}>
        <h2>Sẵn sàng tìm ngôi trường phù hợp?</h2>
        <p>Khám phá dữ liệu điểm chuẩn và ngành học từ hơn 200 trường đại học ngay hôm nay.</p>
        <Link href="/tra-cuu" className={styles.ctaBtn}>
          Bắt đầu tra cứu miễn phí →
        </Link>
      </section>
    </main>
  );
}
