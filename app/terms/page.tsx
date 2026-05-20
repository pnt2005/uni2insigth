import type { Metadata } from 'next';
import Link from 'next/link';
import LayoutLegal from '../../components/LayoutLegal/LayoutLegal';
import StickyTOC, { type TocItem } from '../../components/StickyTOC/StickyTOC';
import TLDRBox from '../../components/TLDRBox/TLDRBox';
import PrintButton from '../../components/PrintButton/PrintButton';
import styles from './terms.module.css';

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng Dịch Vụ Nền Tảng | Uni2Insight',
  description: 'Đọc điều khoản sử dụng dịch vụ Uni2Insight trước khi sử dụng nền tảng.',
  alternates: { canonical: '/terms' },
};

const TOC_ITEMS: TocItem[] = [
  { id: 'dinh-nghia', label: '§1 Định nghĩa' },
  { id: 'dieu-kien', label: '§2 Điều kiện sử dụng' },
  { id: 'tai-khoan', label: '§3 Tài khoản người dùng' },
  { id: 'thanh-toan', label: '§4 Thanh toán và hoàn tiền' },
  { id: 'noi-dung', label: '§5 Nội dung người dùng' },
  { id: 'gioi-han', label: '§6 Giới hạn trách nhiệm' },
  { id: 'cham-dut', label: '§7 Chấm dứt dịch vụ' },
  { id: 'luat', label: '§8 Luật áp dụng' },
  { id: 'changelog', label: '§9 Lịch sử thay đổi' },
];

const TLDR_ITEMS = [
  'Bạn phải từ 13 tuổi trở lên để sử dụng Uni2Insight.',
  'Dữ liệu tra cứu miễn phí; một số tính năng AI phân tích yêu cầu đăng ký.',
  'Không sao chép, phân phối lại dữ liệu của chúng tôi cho mục đích thương mại.',
  'Chúng tôi không chịu trách nhiệm về quyết định tuyển sinh dựa trên thông tin của Uni2Insight.',
  'Tranh chấp giải quyết theo pháp luật Việt Nam, tại TP. Hồ Chí Minh.',
];

export default function TermsPage() {
  return (
    <main>
      {/* ── Header ── */}
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1>Điều khoản dịch vụ</h1>
          <p className={styles.version}>Phiên bản 1.0 — Có hiệu lực từ 12 tháng 5, 2025</p>
          <a href="#changelog" className={styles.changelogLink}>
            Xem lịch sử thay đổi ↓
          </a>
        </div>
      </header>

      <div className={styles.tldrWrap}>
        <TLDRBox
          items={TLDR_ITEMS}
          note="Bản đầy đủ bên dưới có giá trị pháp lý. Tóm tắt chỉ mang tính tham khảo."
        />
      </div>

      {/* ── Body: Sidebar TOC + Content ── */}
      <LayoutLegal sidebar={<StickyTOC items={TOC_ITEMS} />}>
        <h2 id="dinh-nghia">§1 Định nghĩa</h2>
        <p>Trong tài liệu này:</p>
        <ul>
          <li><strong>"Uni2Insight" / "Chúng tôi":</strong> Công ty TNHH Uni2Insight, đăng ký tại TP. Hồ Chí Minh.</li>
          <li><strong>"Dịch vụ":</strong> trang web uni2insight.com và các ứng dụng liên quan.</li>
          <li><strong>"Người dùng" / "Bạn":</strong> cá nhân hoặc tổ chức truy cập Dịch vụ.</li>
          <li><strong>"Nội dung":</strong> dữ liệu, văn bản, hình ảnh, đánh giá bạn đăng tải lên Dịch vụ.</li>
        </ul>

        <h2 id="dieu-kien">§2 Điều kiện sử dụng</h2>
        <p>Bằng cách truy cập Dịch vụ, bạn xác nhận rằng:</p>
        <ul>
          <li>Bạn từ 13 tuổi trở lên (hoặc có sự đồng ý của phụ huynh nếu dưới 18 tuổi).</li>
          <li>Bạn sẽ không sử dụng Dịch vụ cho mục đích trái pháp luật.</li>
          <li>Bạn sẽ không thu thập, scrape dữ liệu tự động mà không có sự đồng ý bằng văn bản của chúng tôi.</li>
          <li>Bạn sẽ không phân phối lại dữ liệu điểm chuẩn cho mục đích thương mại.</li>
        </ul>

        <h2 id="tai-khoan">§3 Tài khoản người dùng</h2>
        <p>
          Bạn chịu trách nhiệm bảo mật thông tin đăng nhập tài khoản. Vui lòng thông báo ngay
          cho chúng tôi tại <a href="mailto:security@uni2insight.com">security@uni2insight.com</a> nếu
          phát hiện truy cập trái phép.
        </p>
        <p>
          Mỗi người chỉ được đăng ký một tài khoản. Tài khoản trùng lặp hoặc giả mạo có thể
          bị xóa mà không cần báo trước.
        </p>

        <h2 id="thanh-toan">§4 Thanh toán và hoàn tiền</h2>
        <p>
          Uni2Insight hiện cung cấp toàn bộ tính năng tra cứu cơ bản <strong>miễn phí</strong>.
          Các tính năng nâng cao (AI phân tích hồ sơ, xuất báo cáo PDF) có thể thu phí trong
          tương lai với thông báo trước 30 ngày.
        </p>
        <p>
          Khi áp dụng tính năng có phí, chúng tôi cung cấp chính sách hoàn tiền trong vòng
          7 ngày kể từ ngày thanh toán nếu dịch vụ không đúng như mô tả.
        </p>

        <h2 id="noi-dung">§5 Nội dung người dùng</h2>
        <p>
          Bạn giữ toàn quyền sở hữu đối với nội dung bạn đăng tải (đánh giá trường, bình luận).
          Bằng cách đăng tải, bạn cấp cho Uni2Insight giấy phép không độc quyền để hiển thị
          nội dung đó trên Dịch vụ.
        </p>
        <p>Chúng tôi có quyền xóa nội dung vi phạm cộng đồng, pháp luật hoặc quyền sở hữu trí tuệ của bên thứ ba.</p>

        <h2 id="gioi-han">§6 Giới hạn trách nhiệm</h2>
        <p>
          Thông tin trên Uni2Insight được cung cấp <strong>"như hiện có"</strong> và chỉ mang
          tính tham khảo. Chúng tôi cố gắng đảm bảo độ chính xác nhưng không chịu trách nhiệm
          về các quyết định tuyển sinh hoặc tài chính được đưa ra dựa trên thông tin này.
        </p>
        <p>
          Trong phạm vi tối đa cho phép của pháp luật, tổng trách nhiệm của Uni2Insight không
          vượt quá số tiền bạn đã trả cho Dịch vụ trong 12 tháng gần nhất.
        </p>

        <h2 id="cham-dut">§7 Chấm dứt dịch vụ</h2>
        <p>
          Bạn có thể xóa tài khoản bất kỳ lúc nào trong phần Cài đặt hoặc bằng cách liên hệ
          với chúng tôi. Chúng tôi có thể tạm khóa hoặc chấm dứt tài khoản vi phạm Điều khoản
          này sau khi thông báo (trừ vi phạm nghiêm trọng — xử lý ngay lập tức).
        </p>

        <h2 id="luat">§8 Luật áp dụng và giải quyết tranh chấp</h2>
        <p>
          Điều khoản này được điều chỉnh bởi pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam.
          Tranh chấp phát sinh từ việc sử dụng Dịch vụ sẽ được giải quyết tại Tòa án nhân dân
          có thẩm quyền tại TP. Hồ Chí Minh.
        </p>
        <p>
          Trước khi khởi kiện, các bên ưu tiên giải quyết bằng thương lượng trong vòng 30 ngày.
        </p>

        {/* ── §9 Changelog ── */}
        <h2 id="changelog">§9 Lịch sử thay đổi</h2>
        <div className={styles.changelogList}>
          {/* Phiên bản mới nhất — mặc định mở */}
          <details className={styles.changelogItem} open>
            <summary className={styles.changelogSummary}>
              <span>Phiên bản 1.0 — 12/05/2025</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </summary>
            <div className={styles.changelogBody}>
              <ul>
                <li>Phiên bản đầu tiên — áp dụng chính thức từ ngày ra mắt.</li>
                <li>Bổ sung mục §4 Thanh toán và hoàn tiền (chính sách hoàn tiền 7 ngày).</li>
                <li>Làm rõ quyền sở hữu nội dung người dùng tại §5.</li>
              </ul>
            </div>
          </details>

          {/* Phiên bản cũ — mặc định đóng */}
          <details className={styles.changelogItem}>
            <summary className={styles.changelogSummary}>
              <span>Bản thảo Beta — 01/01/2025</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </summary>
            <div className={styles.changelogBody}>
              <ul>
                <li>Bản thảo nội bộ — chưa áp dụng công khai.</li>
                <li>Các điều khoản cơ bản về điều kiện sử dụng và tài khoản.</li>
              </ul>
            </div>
          </details>
        </div>
      </LayoutLegal>

      {/* ── Footer actions ── */}
      <footer className={styles.pageFooter}>
        <div className={styles.pageFooterInner}>
          <Link href="/privacy" className={styles.footerLink}>Chính sách bảo mật</Link>
          <a href="mailto:legal@uni2insight.com" className={styles.footerLink}>
            legal@uni2insight.com
          </a>
          <PrintButton />
        </div>
      </footer>
    </main>
  );
}
