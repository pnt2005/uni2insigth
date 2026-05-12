import type { Metadata } from 'next';
import ContactForm from '../../components/ContactForm/ContactForm';
import FAQAccordion from '../../components/FAQAccordion/FAQAccordion';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Liên hệ chúng tôi — Uni2Insight',
  description: 'Gửi câu hỏi, báo lỗi hoặc đề xuất hợp tác. Chúng tôi phản hồi trong vòng 24 giờ làm việc.',
  alternates: { canonical: '/contact' },
};

const FAQ_ITEMS = [
  {
    question: 'Thời gian phản hồi là bao lâu?',
    answer:
      'Chúng tôi cam kết phản hồi tất cả yêu cầu trong vòng 24 giờ làm việc (thứ Hai đến thứ Sáu, 8:00–17:00). Với yêu cầu kỹ thuật khẩn cấp, thời gian xử lý có thể ngắn hơn.',
  },
  {
    question: 'Tôi có thể đề xuất thêm trường hoặc ngành học không?',
    answer:
      'Có! Chúng tôi luôn chào đón đóng góp từ cộng đồng. Hãy gửi thông tin chi tiết qua biểu mẫu liên hệ với chủ đề "Hợp tác kinh doanh" hoặc email trực tiếp đến data@uni2insight.com.',
  },
  {
    question: 'Dữ liệu điểm chuẩn được cập nhật khi nào?',
    answer:
      'Dữ liệu điểm chuẩn được cập nhật ngay sau khi Bộ GD&ĐT công bố kết quả tuyển sinh chính thức, thường vào tháng 9–10 hàng năm. Chúng tôi cũng duy trì dữ liệu lịch sử từ 2018 đến nay.',
  },
  {
    question: 'Làm thế nào để hợp tác quảng cáo với Uni2Insight?',
    answer:
      'Chúng tôi có chương trình hợp tác dành cho trường đại học, trung tâm luyện thi và các thương hiệu giáo dục. Vui lòng chọn chủ đề "Hợp tác kinh doanh" trong biểu mẫu và cung cấp thông tin liên hệ để chúng tôi kết nối.',
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* ── 1. Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>Liên hệ chúng tôi</h1>
          <p className={styles.heroSub}>
            Chúng tôi lắng nghe mọi câu hỏi, góp ý và đề xuất hợp tác.
            Phản hồi trong vòng <strong>24 giờ làm việc</strong>.
          </p>
        </div>
      </section>

      {/* ── 2. Main — 2 cột desktop ── */}
      <section className={styles.main}>
        {/* Cột trái: Form */}
        <div className={styles.formCol}>
          <h2 className={styles.sectionTitle}>Gửi tin nhắn</h2>
          <ContactForm />
        </div>

        {/* Cột phải: Thông tin liên hệ */}
        <aside className={styles.infoCol} aria-label="Thông tin liên hệ">
          <h2 className={styles.sectionTitle}>Thông tin liên hệ</h2>

          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <div>
                <p className={styles.infoLabel}>Email</p>
                <a href="mailto:contact@uni2insight.com" className={styles.infoValue}>
                  contact@uni2insight.com
                </a>
              </div>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.77 9.13a19.79 19.79 0 01-3.07-8.67A2 2 0 012.68 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.4a16 16 0 006.29 6.29l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <div>
                <p className={styles.infoLabel}>Điện thoại</p>
                <a href="tel:+84901234567" className={styles.infoValue}>+84 90 123 4567</a>
              </div>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.infoIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <p className={styles.infoLabel}>Địa chỉ</p>
                <p className={styles.infoValue}>268 Lý Thường Kiệt, Phường 14,<br />Quận 10, TP. Hồ Chí Minh</p>
              </div>
            </li>
          </ul>

          {/* Social icons */}
          <div className={styles.socials} aria-label="Mạng xã hội">
            <a href="https://facebook.com/uni2insight" className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://twitter.com/uni2insight" className={styles.socialLink} aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/uni2insight" className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://youtube.com/@uni2insight" className={styles.socialLink} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Map placeholder */}
          <div className={styles.mapPlaceholder} aria-label="Bản đồ vị trí văn phòng">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>268 Lý Thường Kiệt, Q.10, TP.HCM</span>
          </div>
        </aside>
      </section>

      {/* ── 3. FAQ ── */}
      <FAQAccordion items={FAQ_ITEMS} />
    </main>
  );
}
