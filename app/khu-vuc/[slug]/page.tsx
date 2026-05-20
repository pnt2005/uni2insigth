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
    <FilterLayout>
      <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Các trường đại học tại: {exactRegionName}
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Chào mừng các bạn học sinh và phụ huynh đến với danh sách tổng hợp các trường đại học tại <strong>{exactRegionName}</strong>. Việc lựa chọn một môi trường đại học phù hợp tại khu vực <strong>{exactRegionName}</strong> đóng vai trò cực kỳ quan trọng đối với sự nghiệp và sự phát triển cá nhân của mỗi sinh viên. Nơi đây quy tụ nhiều trường đại học hàng đầu, viện nghiên cứu uy tín và cơ sở đào tạo đa ngành chất lượng cao. Với sự đa dạng trong các mô hình đào tạo từ công lập, dân lập đến quốc tế, khu vực này mang đến hàng loạt cơ hội học tập phong phú, đáp ứng tối đa mọi nhu cầu và định hướng nghề nghiệp khác nhau của người học.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Học tập tại <strong>{exactRegionName}</strong> mang lại những lợi thế vô song về mặt trải nghiệm thực tế cũng như kết nối doanh nghiệp. Sinh viên theo học tại đây sẽ được tiếp cận với hệ thống cơ sở hạ tầng học thuật đồng bộ, thư viện hiện đại và đội ngũ giảng viên giàu kinh nghiệm thực tế. Hơn thế nữa, mạng lưới liên kết rộng rãi của các trường đại học tại <strong>{exactRegionName}</strong> với cộng đồng doanh nghiệp địa phương và các tập đoàn đa quốc gia mở ra vô số cơ hội thực tập, kiến tập cũng như việc làm hấp dẫn ngay sau khi tốt nghiệp. Ngoài giờ học, cuộc sống sinh viên năng động với hàng loạt hoạt động ngoại khóa, câu lạc bộ và sự kiện văn hóa nghệ thuật phong phú tại đây hứa hẹn sẽ mang đến cho bạn những năm tháng thanh xuân rực rỡ và đầy ý nghĩa.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          Đến với Uni2Insight, chúng tôi cung cấp cho bạn những thông tin chi tiết và khách quan nhất về học phí, điểm chuẩn xét tuyển qua các năm, cùng các đánh giá thực tế từ cộng đồng cựu sinh viên đi trước tại khu vực <strong>{exactRegionName}</strong>. Những đánh giá đa chiều này sẽ giúp bạn hiểu rõ hơn về chất lượng giảng dạy, môi trường học thuật, hoạt động phong trào và cơ hội việc làm sau khi ra trường của từng đơn vị đào tạo. Chúc các bạn sẽ tìm thấy một ngôi trường đại học lý tưởng tại <strong>{exactRegionName}</strong> để chắp cánh cho những ước mơ, hoài bão lớn của mình!
        </p>
      </div>

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
