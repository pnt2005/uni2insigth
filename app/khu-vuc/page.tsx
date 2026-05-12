import { Metadata } from "next";
import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "../nganh-hoc/page.module.css";
import { MapPin, School, ArrowRight } from "lucide-react";
import filterStyles from "../../components/Common/FilterLayout.module.css";
import { slugify } from "../../utils/slugify";
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Tra Cứu Khu Vực | Uni2Insight',
  description: 'Tìm kiếm cụm trường đại học, cao đẳng theo tỉnh thành phố.',
  alternates: {
    canonical: '/khu-vuc',
  },
};

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
    // Clean up city name when parsing for URL slug
    const cleanCity = city.replace(/TP\.\s*/g, '');

    return { 
      title: city, 
      count: cityCounts[city], 
      slug: cleanCity
    };
  });

  const customFilters = (
    <>
      <div className={filterStyles.filterGroup}>
        <label className={filterStyles.filterLabel}>Phân Loại Vùng Miền</label>
        <select className={filterStyles.select}>
          <option value="">Tất cả vùng miền</option>
          <option value="mb">Miền Bắc</option>
          <option value="mt">Miền Trung</option>
          <option value="mn">Miền Nam</option>
        </select>
      </div>

      <div className={filterStyles.filterGroup}>
        <label className={filterStyles.filterLabel}>Số lượng trường</label>
        <div className={filterStyles.checkboxGroup}>
          <label className={filterStyles.checkboxLabel}>
            <input type="checkbox" /> Nhiều nhất (&gt; 50 trường)
          </label>
          <label className={filterStyles.checkboxLabel}>
            <input type="checkbox" /> Trung bình (10 - 50 trường)
          </label>
        </div>
      </div>
    </>
  );

  return (
    <FilterLayout 
      title="Tra cứu theo Khu vực" 
      subtitle="Tìm kiếm cụm trường đại học, cao đẳng theo tỉnh thành phố."
      filters={customFilters}
    >
      <div 
        className={styles.grid}
        style={{ 
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem'
        }}
      >
        {regions.map((region, idx) => (
          <Link 
            href={`/khu-vuc/${slugify(region.title)}`} 
            key={idx} 
            className={styles.card}
            style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              backgroundColor: 'var(--bg-white)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              transition: 'var(--transition)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              backgroundColor: 'var(--primary-light)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary)',
              marginBottom: '1rem'
            }}>
              <MapPin size={24} />
            </div>
            
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 800, 
              color: 'var(--text-primary)',
              marginBottom: '0.25rem'
            }}>
              {region.title}
            </h3>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              marginBottom: '1.25rem'
            }}>
              <School size={14} />
              <span><strong>{region.count}</strong> trường</span>
            </div>

            <div style={{ 
              marginTop: 'auto',
              width: '100%',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              color: 'var(--primary)',
              fontWeight: 700,
              fontSize: '0.8rem'
            }}>
              Chi tiết <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </FilterLayout>
  );
}
