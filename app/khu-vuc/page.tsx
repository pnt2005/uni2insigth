import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "../nganh-hoc/page.module.css";

export default function RegionList() {
  const regions = [
    { title: "Khu vực TP.HCM", count: 85, icon: "🌆" },
    { title: "Khu vực Hà Nội", count: 90, icon: "🏛️" },
    { title: "Khu vực Đà Nẵng", count: 25, icon: "🌉" },
    { title: "Khu vực Cần Thơ", count: 12, icon: "🚤" },
    { title: "Đồng Bằng Sông Hồng", count: 45, icon: "🌾" },
  ];

  return (
    <FilterLayout 
      title="Tra Cứu Theo Khu Vực" 
      subtitle="Tìm kiếm cụm trường đại học, cao đẳng theo tỉnh thành phố."
    >
      <div className={styles.grid}>
        {regions.map((region, idx) => (
          <Link href={`/khu-vuc/${region.title.toLowerCase().replace(/khu vực /g, '').replace(/\./g, '').replace(/ /g, '-')}`} key={idx} className={styles.card}>
            <div className={styles.cardHeader} style={{ fontSize: '3rem', textAlign: 'center' }}>
              {region.icon}
            </div>
            <h3 className={styles.title} style={{ textAlign: 'center' }}>{region.title}</h3>
            <div className={styles.meta} style={{ alignItems: 'center' }}>
              <div className={styles.metaItem}>
                <span className={styles.icon}>🎓</span> {region.count} trường đại học
              </div>
            </div>
          </Link>
        ))}
      </div>
    </FilterLayout>
  );
}
