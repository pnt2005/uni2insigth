import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "./page.module.css";
import { slugify } from "../../utils/slugify";

export default function MajorList() {
  const majors = [
    { title: "Công nghệ thông tin", category: "Kỹ thuật - Công nghệ", schools: 120, salary: "10-30tr" },
    { title: "Trí tuệ nhân tạo", category: "Kỹ thuật - Công nghệ", schools: 30, salary: "15-40tr" },
    { title: "Marketing", category: "Kinh Doanh - Quản Lý", schools: 150, salary: "8-25tr" },
    { title: "Tài chính ngân hàng", category: "Kinh Doanh - Quản Lý", schools: 140, salary: "10-30tr" },
    { title: "Ngôn ngữ Anh", category: "Ngôn ngữ", schools: 110, salary: "8-20tr" },
    { title: "Thiết kế đồ họa", category: "Nghệ thuật - Thiết kế", schools: 80, salary: "9-25tr" },
  ];

  return (
    <FilterLayout 
      title="Danh Mục Ngành Học" 
      subtitle="Khám phá và tìm hiểu chi tiết về các ngành học phổ biến nhất hiện nay."
    >
      <div className={styles.grid}>
        {majors.map((major, idx) => (
          <Link href={`/nganh-hoc/${slugify(major.category)}/${slugify(major.title)}`} key={idx} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.category}>{major.category}</span>
            </div>
            <h3 className={styles.title}>{major.title}</h3>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.icon}>🏫</span> {major.schools} trường đào tạo
              </div>
              <div className={styles.metaItem}>
                <span className={styles.icon}>💰</span> Lương TB: {major.salary}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </FilterLayout>
  );
}
