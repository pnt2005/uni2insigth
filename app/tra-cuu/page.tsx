import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "../nganh-hoc/page.module.css";

export default function SearchHub() {
  const tools = [
    { title: "Tra cứu Điểm chuẩn", path: "/tra-cuu/diem-chuan", icon: "📊", desc: "Dữ liệu điểm chuẩn các năm từ 2020-2025" },
    { title: "Tra cứu Học phí", path: "/tra-cuu/hoc-phi", icon: "💳", desc: "Thông tin học phí mới nhất và lộ trình tăng" },
    { title: "Tra cứu Học bổng", path: "/tra-cuu/hoc-bong", icon: "🏆", desc: "Tổng hợp các loại học bổng và điều kiện" },
    { title: "So sánh Trường", path: "/tra-cuu/so-sanh", icon: "⚖️", desc: "So sánh 2-3 trường đại học cùng lúc" },
  ];

  return (
    <FilterLayout 
      title="Tra Cứu Nhanh" 
      subtitle="Sử dụng các công cụ tra cứu tự động để lấy thông tin nhanh và chính xác nhất."
    >
      <div className={styles.grid}>
        {tools.map((tool, idx) => (
          <Link href={tool.path} key={idx} className={styles.card}>
            <div className={styles.cardHeader} style={{ fontSize: '3rem' }}>
              {tool.icon}
            </div>
            <h3 className={styles.title}>{tool.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{tool.desc}</p>
          </Link>
        ))}
      </div>
    </FilterLayout>
  );
}
