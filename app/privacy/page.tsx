import type { Metadata } from 'next';
import Link from 'next/link';
import LayoutLegal from '../../components/LayoutLegal/LayoutLegal';
import StickyTOC, { type TocItem } from '../../components/StickyTOC/StickyTOC';
import TLDRBox from '../../components/TLDRBox/TLDRBox';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật Thông Tin Người Dùng | Uni2Insight',
  description: 'Tìm hiểu cách Uni2Insight thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.',
  alternates: { canonical: '/privacy' },
};

const TOC_ITEMS: TocItem[] = [
  { id: 'thu-thap', label: '§1 Dữ liệu chúng tôi thu thập' },
  { id: 'muc-dich', label: '§2 Mục đích sử dụng' },
  { id: 'chia-se', label: '§3 Chia sẻ với bên thứ ba' },
  { id: 'cookie', label: '§4 Cookie và tracking' },
  { id: 'quyen-han', label: '§5 Quyền của bạn' },
  { id: 'bao-mat', label: '§6 Bảo mật dữ liệu' },
  { id: 'lien-he', label: '§7 Liên hệ và khiếu nại' },
];

const TLDR_ITEMS = [
  'Chúng tôi chỉ thu thập dữ liệu cần thiết để vận hành dịch vụ (email, hành vi sử dụng).',
  'Chúng tôi không bán thông tin cá nhân của bạn cho bên thứ ba.',
  'Bạn có thể yêu cầu xóa tài khoản và toàn bộ dữ liệu bất cứ lúc nào.',
  'Dữ liệu được mã hóa AES-256 khi lưu trữ và TLS 1.3 khi truyền tải.',
  'Chúng tôi sử dụng Google Analytics và có thể dùng cookie phân tích.',
];

export default function PrivacyPage() {
  return (
    <main>
      {/* ── Header ── */}
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1>Chính sách bảo mật</h1>
          <p className={styles.updatedAt}>Cập nhật lần cuối: 12 tháng 5, 2025</p>
          <a
            href="/privacy.pdf"
            download
            className={styles.downloadBtn}
            aria-label="Tải xuống bản PDF chính sách bảo mật"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Tải xuống PDF
          </a>
        </div>
      </header>

      <div className={styles.tldrWrap}>
        <TLDRBox
          items={TLDR_ITEMS}
          note="Đây là tóm tắt — bản đầy đủ bên dưới có giá trị pháp lý."
        />
      </div>

      {/* ── Body: Sidebar TOC + Content ── */}
      <LayoutLegal sidebar={<StickyTOC items={TOC_ITEMS} />}>
        <h2 id="thu-thap">§1 Dữ liệu chúng tôi thu thập</h2>
        <p>
          Khi bạn sử dụng Uni2Insight, chúng tôi có thể thu thập các loại thông tin sau:
        </p>
        <ul>
          <li><strong>Thông tin tài khoản:</strong> họ tên, địa chỉ email khi bạn đăng ký.</li>
          <li><strong>Dữ liệu sử dụng:</strong> trang bạn truy cập, thời gian, thiết bị, trình duyệt.</li>
          <li><strong>Dữ liệu tìm kiếm:</strong> từ khóa tìm kiếm ngành học và trường đại học.</li>
          <li><strong>Cookie:</strong> nhận dạng phiên, tùy chọn hiển thị, thống kê ẩn danh.</li>
        </ul>
        <p>
          Chúng tôi không thu thập số điện thoại, địa chỉ nhà, hay thông tin tài chính trừ khi bạn cung cấp chủ động.
        </p>

        <h2 id="muc-dich">§2 Mục đích sử dụng</h2>
        <p>Thông tin thu thập được sử dụng nhằm:</p>
        <ul>
          <li>Cung cấp và cải thiện tính năng tìm kiếm, tra cứu thông tin.</li>
          <li>Cá nhân hóa gợi ý ngành học và trường phù hợp.</li>
          <li>Gửi thông báo quan trọng (điểm chuẩn mới, cập nhật hệ thống).</li>
          <li>Phân tích xu hướng sử dụng để tối ưu trải nghiệm.</li>
          <li>Phát hiện và ngăn chặn các hành vi gian lận.</li>
        </ul>
        <p>
          Chúng tôi <strong>không</strong> sử dụng dữ liệu của bạn cho mục đích quảng cáo nhắm mục tiêu của bên thứ ba.
        </p>

        <h2 id="chia-se">§3 Chia sẻ với bên thứ ba</h2>
        <p>
          Uni2Insight <strong>không bán</strong> thông tin cá nhân của bạn. Chúng tôi chỉ chia sẻ dữ liệu trong các trường hợp sau:
        </p>
        <ul>
          <li><strong>Nhà cung cấp dịch vụ:</strong> hosting (Vercel), phân tích (Google Analytics), email (SendGrid) — họ tuân thủ hợp đồng bảo mật nghiêm ngặt.</li>
          <li><strong>Yêu cầu pháp lý:</strong> khi có lệnh của cơ quan nhà nước có thẩm quyền.</li>
          <li><strong>Bảo vệ quyền lợi:</strong> khi cần ngăn chặn hành vi gian lận hoặc bảo vệ người dùng khác.</li>
        </ul>

        <h2 id="cookie">§4 Cookie và tracking</h2>
        <p>Chúng tôi sử dụng các loại cookie sau:</p>
        <ul>
          <li><strong>Cookie thiết yếu:</strong> duy trì phiên đăng nhập, không thể tắt.</li>
          <li><strong>Cookie phân tích:</strong> Google Analytics (ẩn danh IP, không theo dõi xuyên trang web).</li>
          <li><strong>Cookie tùy chọn:</strong> lưu giao diện sáng/tối, ngôn ngữ.</li>
        </ul>
        <p>
          Bạn có thể quản lý cookie qua cài đặt trình duyệt hoặc banner cookie khi truy cập lần đầu.
        </p>

        <h2 id="quyen-han">§5 Quyền của bạn</h2>
        <p>Theo quy định pháp luật Việt Nam và tiêu chuẩn GDPR, bạn có quyền:</p>
        <ul>
          <li><strong>Truy cập:</strong> yêu cầu bản sao toàn bộ dữ liệu chúng tôi lưu trữ về bạn.</li>
          <li><strong>Chỉnh sửa:</strong> cập nhật thông tin cá nhân bất cứ lúc nào trong phần Cài đặt tài khoản.</li>
          <li><strong>Xóa:</strong> yêu cầu xóa toàn bộ dữ liệu và đóng tài khoản.</li>
          <li><strong>Phản đối:</strong> từ chối xử lý dữ liệu cho mục đích marketing.</li>
          <li><strong>Chuyển dữ liệu:</strong> nhận dữ liệu của bạn ở định dạng có thể đọc được (JSON/CSV).</li>
        </ul>
        <p>
          Để thực hiện quyền của mình, gửi yêu cầu đến{' '}
          <a href="mailto:privacy@uni2insight.com">privacy@uni2insight.com</a>. Chúng tôi xử lý trong 30 ngày.
        </p>

        <h2 id="bao-mat">§6 Bảo mật dữ liệu</h2>
        <p>
          Chúng tôi áp dụng các biện pháp bảo mật theo tiêu chuẩn ngành:
        </p>
        <ul>
          <li>Mã hóa AES-256 cho dữ liệu lưu trữ.</li>
          <li>TLS 1.3 cho mọi kết nối truyền tải.</li>
          <li>Xác thực hai yếu tố (2FA) cho tài khoản quản trị.</li>
          <li>Kiểm tra bảo mật định kỳ hàng quý.</li>
          <li>Hạn chế truy cập dữ liệu theo nguyên tắc least privilege.</li>
        </ul>
        <p>
          Trong trường hợp xảy ra sự cố bảo mật ảnh hưởng đến dữ liệu của bạn, chúng tôi sẽ thông báo qua email trong vòng 72 giờ.
        </p>

        <h2 id="lien-he">§7 Liên hệ và khiếu nại</h2>
        <p>
          Nếu bạn có câu hỏi về chính sách bảo mật hoặc muốn gửi khiếu nại:
        </p>
        <ul>
          <li>
            Email:{' '}
            <a href="mailto:privacy@uni2insight.com">privacy@uni2insight.com</a>
          </li>
          <li>Địa chỉ: 268 Lý Thường Kiệt, Phường 14, Quận 10, TP. Hồ Chí Minh</li>
        </ul>
        <p>
          Xem thêm:{' '}
          <Link href="/terms">Điều khoản dịch vụ</Link>
        </p>
      </LayoutLegal>

      {/* ── Footer actions ── */}
      <footer className={styles.pageFooter}>
        <div className={styles.pageFooterInner}>
          <a href="mailto:privacy@uni2insight.com" className={styles.footerLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            privacy@uni2insight.com
          </a>
          <Link href="/terms" className={styles.footerLink}>Điều khoản dịch vụ</Link>
          <Link href="/contact?subject=delete-account" className={styles.footerLink}>
            Yêu cầu xóa tài khoản
          </Link>
        </div>
      </footer>
    </main>
  );
}
