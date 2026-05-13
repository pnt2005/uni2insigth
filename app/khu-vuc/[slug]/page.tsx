import Link from "next/link";
import Image from "next/image";
import styles from "../../nganh-hoc/page.module.css";
import fs from "fs";
import path from "path";
import { slugify } from "../../../utils/slugify";
import FilterLayout from "../../../components/Common/FilterLayout";
import { MapPin, Coins, BookOpen } from "lucide-react";

export default async function RegionDeepPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const regionSlug = resolvedParams.slug;
  const regionNameOriginal = regionSlug.replace(/-/g, ' ').toUpperCase();

  let unis: any[] = [];
  try {
    const unisContent = fs.readFileSync(path.join(process.cwd(), 'data/universities.json'), 'utf8');
    unis = JSON.parse(unisContent);
  } catch (error) {
    console.error("Could not read universities.json", error);
  }

  const regionUnis = unis.filter((u: any) => {
    const cleanCity = (u.city || "").replace(/TP\.?\s*/g, '');
    const citySlug = slugify(cleanCity);
    const regionNameSlug = slugify(u.region || "");
    return citySlug === regionSlug || regionNameSlug === regionSlug;
  });

  const isRegionMatch = regionUnis.length > 0 && slugify(regionUnis[0].region || "") === regionSlug;
  const exactRegionName = isRegionMatch 
    ? regionUnis[0].region 
    : (regionUnis.length > 0 ? regionUnis[0].city : regionNameOriginal);

  return (
    <FilterLayout 
      title={`Các trường đại học tại: ${exactRegionName}`}
      subtitle={`Khám phá ${regionUnis.length} trường đại học, học viện nổi bật nhất tại khu vực ${exactRegionName}.`}
    >
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/khu-vuc" style={{ display: 'inline-block', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, padding: '8px 16px', background: 'var(--border)', borderRadius: '8px' }}>
          ← Quay lại Cụm Trường
        </Link>
      </div>

      <div className={styles.grid}>
        {regionUnis.length > 0 ? (
          regionUnis.map((uni) => (
            <Link key={uni.id} href={`/review/${uni.id}`} className={styles.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '4px' }}>
                  <Image 
                    src={uni.image} 
                    alt={`Logo ${uni.name}`} 
                    width={48} 
                    height={48} 
                    style={{ objectFit: 'contain' }}
                    loading="lazy" 
                  />
                </div>
                <h2 className={styles.title} style={{ margin: 0, fontSize: '1.15rem' }}>{uni.name}</h2>
              </div>
              
              <div className={styles.meta} style={{ marginTop: '0.5rem' }}>
                <div className={styles.metaItem} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={uni.address || uni.city}>
                  <MapPin size={16} style={{ flexShrink: 0 }} /> {uni.address || uni.city}
                </div>
                <div className={styles.metaItem}>
                  <Coins size={16} /> Học phí: {uni.tuitionText}
                </div>
                <div className={styles.metaItem}>
                  <BookOpen size={16} /> Điểm chuẩn: {uni.admissionScoreRange}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ padding: '3rem', gridColumn: '1 / -1', textAlign: 'center', background: 'var(--background)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Không tìm thấy dữ liệu trường học cho khu vực này.</p>
          </div>
        )}
      </div>
    </FilterLayout>
  );
}
