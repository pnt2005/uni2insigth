import { Metadata } from "next";
import FilterLayout from "../../components/Common/FilterLayout";
import TopFilterBar from "../../components/Common/TopFilterBar";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: 'Tra Cứu Danh Mục Các Ngành Học Đại Học | Uni2Insight',
  description: 'Khám phá và tìm hiểu chi tiết về các ngành học phổ biến nhất hiện nay.',
  alternates: {
    canonical: '/nganh-hoc',
  },
};

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ExpandableSection from "@/components/Common/ExpandableSection";

export default async function MajorList({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.toLowerCase() : '';
  const category = typeof params.cat === 'string' ? params.cat : 'Tất cả';

  const majorsDir = path.join(process.cwd(), 'data/majors');
  let majors: any[] = [];

  try {
    const filenames = fs.readdirSync(majorsDir);
    majors = filenames
      .filter((filename) => filename.endsWith('.mdx') && !filename.startsWith('_'))
      .map((filename) => {
        const filePath = path.join(majorsDir, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        return {
          slug: filename.replace(/\.mdx$/, ''),
          title: data.majorName || data.title || "Ngành học",
          category: data.category || "Phân loại chung",
          schools: data.schools || "--",
          salary: data.salaryRange || "Thỏa thuận"
        };
      });
  } catch (error) {
    console.error("Lỗi khi đọc file majors", error);
  }

  const categoriesSet = new Set<string>();
  majors.forEach(m => categoriesSet.add(m.category));
  const filterOptions = Array.from(categoriesSet);

  const filteredMajors = majors.filter(m => {
    const matchQuery = !query || m.title.toLowerCase().includes(query) || m.slug.toLowerCase().includes(query);
    const matchCat = category === 'Tất cả' || m.category === category;
    return matchQuery && matchCat;
  });

  return (
    <FilterLayout
      filters={<TopFilterBar placeholder="Tìm kiếm ngành học..." filterOptions={filterOptions} filterLabel="Nhóm ngành" />}
    >
      <div style={{ marginBottom: '2.5rem', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Định Hướng & Tra Cứu Danh Mục Ngành Học
        </h1>
        <ExpandableSection>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
            Chào mừng bạn đến với chuyên mục <strong>Tra cứu Danh mục Ngành học</strong> của Uni2Insight. Trong hành trình định hướng nghề nghiệp, việc lựa chọn một ngành học phù hợp đóng vai trò quyết định, mở ra cánh cửa dẫn đến tương lai vững chắc và phát triển toàn diện. Tuy nhiên, trước hàng trăm ngành nghề đa dạng từ Công nghệ thông tin, Kinh tế, Kỹ thuật đến các khối ngành Nghệ thuật và Khoa học Xã hội, học sinh thường gặp nhiều khó khăn để tìm ra lựa chọn tối ưu. Tại đây, chúng tôi cung cấp hệ thống phân loại khoa học và thông tin chi tiết về từng ngành học, giúp bạn dễ dàng so sánh, phân tích tiềm năng phát triển và đưa ra quyết định thông thái nhất.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem', fontSize: '0.95rem' }}>
            Mỗi ngành học đều có những đặc thù riêng về nội dung chương trình đào tạo, yêu cầu tố chất cá nhân, mức học phí cũng như cơ hội việc làm sau khi ra trường. Bằng việc chọn đúng ngành học phù hợp với đam mê và năng lực cốt lõi, sinh viên không chỉ có thêm động lực học tập mà còn tối ưu hóa cơ hội phát triển nghề nghiệp lâu dài. Ngược lại, việc chọn sai ngành có thể dẫn đến lãng phí thời gian, công sức và tài chính. Do đó, Uni2Insight nỗ lực tổng hợp các số liệu thực tế về mức lương trung bình, danh sách các trường đào tạo uy tín và những đánh giá trực quan nhất từ cựu sinh viên, nhằm mang lại góc nhìn đa chiều và chân thực cho thế hệ trẻ.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            Bên cạnh thông tin cơ bản về ngành học, nền tảng của chúng tôi còn cập nhật liên tục xu hướng thị trường lao động, nhu cầu nhân lực trong nước và quốc tế. Hãy bắt đầu bằng cách sử dụng thanh bộ lọc thông minh để tìm kiếm theo nhóm ngành, từ đó khám phá các cơ hội nghề nghiệp đầy triển vọng đang chờ đón bạn phía trước!
          </p>
        </ExpandableSection>
      </div>

      <div className={styles['program-grid']}>
        {filteredMajors.map((major, idx) => (
          <Link href={`/nganh-hoc/${major.slug}`} key={idx} className={styles['program-card']}>
            <div className={styles['program-card__category']}>
              <span>{major.category}</span>
            </div>
            <h3 className={styles['program-card__title']}>{major.title}</h3>
            <div className={styles['program-card__meta']}>
              <div className={styles['program-card__meta-item']}>
                <span className={styles['program-card__icon']}></span> {major.schools} trường đào tạo
              </div>
              <div className={styles['program-card__meta-item']}>
                <span className={styles['program-card__icon']}></span> Lương TB: {major.salary}
              </div>
            </div>
          </Link>
        ))}
        {filteredMajors.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Không tìm thấy ngành học nào phù hợp.
          </p>
        )}
      </div>
    </FilterLayout>
  );
}
