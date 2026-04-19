import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "../nganh-hoc/page.module.css";
import { slugify } from "../../utils/slugify";

import fs from 'fs';
import path from 'path';

export default async function RegionList() {
  let unis: any[] = [];
  try {
    const unisContent = fs.readFileSync(path.join(process.cwd(), 'data/universities.json'), 'utf8');
    unis = JSON.parse(unisContent);
  } catch (error) {
    console.error("Could not read universities.json", error);
  }

  // Calculate counts by city
  const cityCounts: Record<string, number> = {};
  unis.forEach((u: any) => {
    if (u.city) {
      cityCounts[u.city] = (cityCounts[u.city] || 0) + 1;
    }
  });

  // Default hardcoded fallback if missing
  if (Object.keys(cityCounts).length === 0) {
    cityCounts["TP.HCM"] = 85;
    cityCounts["Hà Nội"] = 90;
    cityCounts["Đà Nẵng"] = 25;
  }

  const regions = Object.keys(cityCounts).map(city => {
    let icon = "📍";
    if (city.includes("Hồ Chí Minh") || city.includes("TP.HCM")) icon = "🌆";
    if (city.includes("Hà Nội")) icon = "🏛️";
    if (city.includes("Đà Nẵng")) icon = "🌉";
    if (city.includes("Cần Thơ")) icon = "🚤";

    // Clean up city name when parsing for URL slug
    const cleanCity = city.replace(/TP\.\s*/g, '');

    return { 
      title: `Khu vực ${city}`, 
      count: cityCounts[city], 
      icon,
      slug: cleanCity
    };
  });

  return (
    <FilterLayout 
      title="Tra Cứu Theo Khu Vực" 
      subtitle="Tìm kiếm cụm trường đại học, cao đẳng theo tỉnh thành phố."
    >
      <div className={styles.grid}>
        {regions.map((region, idx) => (
          <Link href={`/khu-vuc/${slugify(region.title.replace(/khu vực /gi, ''))}`} key={idx} className={styles.card}>
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
