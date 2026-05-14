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
          <ContactForm className={styles.fullHeightForm} />
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
                  uni2insight@.com
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
                <a href="tel:+84901234567" className={styles.infoValue}>1900 1234</a>
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
                <p className={styles.infoValue}>Đại học Công Nghệ Thông Tin - Khu phố 34, Phường Linh Xuân, Thành phố Hồ Chí Minh.</p>
              </div>
            </li>
          </ul>

          {/* Social icons */}
          <div className={styles.socials} aria-label="Mạng xã hội">
            <a href="https://www.facebook.com/profile.php?id=61567552554990&sk=followers" target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="https://www.instagram.com/uni2insight?igsh=MXhhcTQ5enFpMzBv" target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://www.tiktok.com/@uni2insight?_r=1&_t=ZS-9684VD1mn6j" target="_blank" rel="noopener noreferrer nofollow" className={styles.socialLink} aria-label="Tiktok">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.66a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
            </a>
          </div>

          {/* Map Container */}
          <div className={styles.mapContainer} aria-label="Bản đồ vị trí văn phòng">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.231240416692!2d106.800479175906!3d10.87000885746351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1715671600000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí Đại học Công Nghệ Thông Tin"
            />
          </div>
        </aside>
      </section>

      {/* ── 3. FAQ ── */}
      <FAQAccordion items={FAQ_ITEMS} />
    </main>
  );
}
