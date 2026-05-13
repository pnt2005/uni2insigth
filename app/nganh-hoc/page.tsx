import { Metadata } from "next";
import FilterLayout from "../../components/Common/FilterLayout";
import TopFilterBar from "../../components/Common/TopFilterBar";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: 'Danh Mục Ngành Học | Uni2Insight',
  description: 'Khám phá và tìm hiểu chi tiết về các ngành học phổ biến nhất hiện nay.',
  alternates: {
    canonical: '/nganh-hoc',
  },
};

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
      title="Danh Mục Ngành Học"
      subtitle="Khám phá và tìm hiểu chi tiết về các ngành học phổ biến nhất hiện nay."
      filters={<TopFilterBar placeholder="Tìm kiếm ngành học..." filterOptions={filterOptions} filterLabel="Nhóm ngành" />}
    >
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
