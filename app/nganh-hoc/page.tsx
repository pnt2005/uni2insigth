import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "./page.module.css";
import filterStyles from "../../components/Common/FilterLayout.module.css";
import { slugify } from "../../utils/slugify";

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function MajorList() {
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

  const customFilters = (
    <>
      <div className={filterStyles.filterGroup}>
        <label className={filterStyles.filterLabel}>Lĩnh Vực Đào Tạo</label>
        <select className={filterStyles.select}>
          <option value="">Tất cả lĩnh vực</option>
          <option value="kinh-te">Kinh tế & Quản trị</option>
          <option value="ky-thuat">Kỹ thuật & Công nghệ</option>
          <option value="y-duoc">Y Dược & Sức khỏe</option>
          <option value="xa-hoi">Khoa học Xã hội</option>
        </select>
      </div>

      <div className={filterStyles.filterGroup}>
        <label className={filterStyles.filterLabel}>Khối Thi</label>
        <div className={filterStyles.checkboxGroup}>
          <label className={filterStyles.checkboxLabel}>
            <input type="checkbox" /> A00, A01
          </label>
          <label className={filterStyles.checkboxLabel}>
            <input type="checkbox" /> D01, D07
          </label>
          <label className={filterStyles.checkboxLabel}>
            <input type="checkbox" /> B00, C00
          </label>
        </div>
      </div>
    </>
  );

  return (
    <FilterLayout 
      title="Danh Mục Ngành Học" 
      subtitle="Khám phá và tìm hiểu chi tiết về các ngành học phổ biến nhất hiện nay."
      filters={customFilters}
    >
      <div className={styles['program-grid']}>
        {majors.map((major, idx) => (
          <Link href={`/nganh-hoc/${major.slug}`} key={idx} className={styles['program-card']}>
            <div className={styles['program-card__category']}>
              <span>{major.category}</span>
            </div>
            <h3 className={styles['program-card__title']}>{major.title}</h3>
            <div className={styles['program-card__meta']}>
              <div className={styles['program-card__meta-item']}>
                <span className={styles['program-card__icon']}>🏫</span> {major.schools} trường đào tạo
              </div>
              <div className={styles['program-card__meta-item']}>
                <span className={styles['program-card__icon']}>💰</span> Lương TB: {major.salary}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </FilterLayout>
  );
}
