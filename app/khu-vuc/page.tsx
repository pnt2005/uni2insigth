import { Metadata } from "next";
import FilterLayout from "../../components/Common/FilterLayout";
import TopFilterBar from "../../components/Common/TopFilterBar";
import Link from "next/link";
import styles from "../nganh-hoc/page.module.css";
import { MapPin, School, ArrowRight } from "lucide-react";
import { slugify } from "../../utils/slugify";
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Danh Sách Các Trường Đại Học Theo Khu Vực | Uni2Insight',
  description: 'Tìm kiếm cụm trường đại học, cao đẳng theo tỉnh thành phố.',
  alternates: {
    canonical: '/khu-vuc',
  },
};

export default async function RegionList({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.toLowerCase() : '';

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

  let regions = Object.keys(cityCounts).map(city => {
    // Clean up city name when parsing for URL slug
    const cleanCity = city.replace(/TP\.?\s*/g, '');

    return {
      title: city,
      count: cityCounts[city],
      slug: cleanCity
    };
  });

  if (query) {
    regions = regions.filter(r => r.title.toLowerCase().includes(query) || r.slug.toLowerCase().includes(query));
  }

  return (
    <FilterLayout>
      <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>Tra cứu Trường Đại học theo Tỉnh & Thành Phố (Khu Vực)</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Chào mừng bạn đến với chuyên mục <strong>Tra cứu Khu vực</strong> của Uni2Insight. Việc lựa chọn trường đại học không chỉ phụ thuộc vào ngành học, mức điểm chuẩn hay học phí, mà còn bị ảnh hưởng rất lớn bởi vị trí địa lý. Mỗi khu vực, từ các đô thị sầm uất như Hà Nội, TP. Hồ Chí Minh, Đà Nẵng cho đến các tỉnh thành lân cận, đều mang lại những trải nghiệm học tập và sinh hoạt hoàn toàn khác biệt. Tại đây, chúng tôi tổng hợp và phân loại chi tiết danh sách các trường đại học, cao đẳng, học viện theo từng tỉnh thành phố cụ thể, giúp học sinh và phụ huynh dễ dàng tra cứu, so sánh và đưa ra quyết định phù hợp nhất với điều kiện cá nhân.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
          Lựa chọn học tập tại các thành phố lớn thường đi kèm với lợi thế về cơ sở hạ tầng hiện đại, cơ hội thực tập, việc làm phong phú và mạng lưới giao tiếp xã hội rộng mở. Tuy nhiên, mức sống đắt đỏ, chi phí sinh hoạt cao và áp lực cạnh tranh cũng là những yếu tố cần được cân nhắc kỹ lưỡng. Ngược lại, khi chọn học tại các trường đại học thuộc khu vực lân cận hoặc tỉnh nhà, sinh viên sẽ tiết kiệm được đáng kể chi phí, tận hưởng không gian sống yên bình hơn và được hỗ trợ từ gia đình. Dù lựa chọn của bạn là gì, Uni2Insight luôn sẵn sàng đồng hành, cung cấp những góc nhìn khách quan và review thực tế từ cộng đồng cựu sinh viên, giúp bạn tự tin hơn trên con đường định hướng nghề nghiệp tương lai.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          Bên cạnh việc tra cứu danh sách trường theo khu vực, nền tảng của chúng tôi còn tích hợp các công cụ hỗ trợ như tìm kiếm chuyên sâu theo ngành học, so sánh mức học phí và đánh giá cơ sở vật chất. Hãy bắt đầu hành trình khám phá và tìm ra bến đỗ lý tưởng nhất cho chặng đường học thuật sắp tới của bạn!
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <TopFilterBar placeholder="Tìm kiếm tỉnh/thành phố..." />
      </div>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem'
        }}
      >
        {regions.map((region, idx) => (
          <Link
            href={`/khu-vuc/${slugify(region.title.replace(/TP\.?\s*/g, ""))}`}
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
        {regions.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Không tìm thấy khu vực nào phù hợp.
          </p>
        )}
      </div>
    </FilterLayout>
  );
}
