import Link from "next/link";
import Image from "next/image";
import styles from "../../tra-cuu/tim-kiem/search.module.css";
import fs from "fs";
import path from "path";
import { slugify } from "../../../utils/slugify";

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
    const cleanCity = (u.city || "").replace(/TP\.\s*/g, '');
    return slugify(cleanCity) === regionSlug;
  });

  const exactRegionName = regionUnis.length > 0 ? regionUnis[0].city : regionNameOriginal;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/khu-vuc" style={{ display: 'inline-block', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, padding: '8px 16px', background: 'var(--border)', borderRadius: '8px' }}>
          ← Quay lại Cụm Trường
        </Link>
      </div>

      <h1 className={styles.title} style={{ textAlign: 'left', marginBottom: '1rem', fontSize: '2rem', marginTop: 0 }}>
        Các trường đại học tại: {exactRegionName}
      </h1>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Khám phá {regionUnis.length} trường đại học, học viện nổi bật nhất tại khu vực <strong>{exactRegionName}</strong>.
      </p>

      <div className={styles.grid}>
        {regionUnis.length > 0 ? (
          regionUnis.map((uni) => (
            <div key={uni.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={uni.image} 
                    alt={`Logo ${uni.name}`} 
                    width={60} 
                    height={60} 
                    className={styles.logo}
                    loading="lazy" 
                  />
                </div>
                <h2 className={styles.schoolName}>{uni.name}</h2>
              </div>
              
              <div className={styles.cardBody}>
                <p><strong>Tỉnh/Thành phố:</strong> {uni.city}</p>
                <p><strong>Học phí:</strong> {uni.tuitionText}</p>
                <p><strong>Điểm chuẩn:</strong> {uni.admissionScoreRange}</p>
              </div>
              
              <div className={styles.cardFooter}>
                <Link href={`/review/${uni.id}`} className={styles.linkButton}>
                  Xem Review
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '3rem', gridColumn: '1 / -1', textAlign: 'center', background: 'var(--border)', borderRadius: '12px' }}>
            <p>Không tìm thấy dữ liệu trường học cho khu vực này.</p>
          </div>
        )}
      </div>
    </div>
  );
}
