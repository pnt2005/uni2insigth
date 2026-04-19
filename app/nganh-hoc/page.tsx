import FilterLayout from "../../components/Common/FilterLayout";
import Link from "next/link";
import styles from "./page.module.css";
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
          title: data.title || "Ngành học",
          category: data.category || "Phân loại chung",
          schools: data.schools || "--",
          salary: data.salaryRange || "Thỏa thuận"
        };
      });
  } catch (error) {
    console.error("Lỗi khi đọc file majors", error);
  }

  return (
    <FilterLayout 
      title="Danh Mục Ngành Học" 
      subtitle="Khám phá và tìm hiểu chi tiết về các ngành học phổ biến nhất hiện nay."
    >
      <div className={styles.grid}>
        {majors.map((major, idx) => (
          <Link href={`/nganh-hoc/${major.slug}`} key={idx} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.category}>{major.category}</span>
            </div>
            <h3 className={styles.title}>{major.title}</h3>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.icon}>🏫</span> {major.schools} trường đào tạo
              </div>
              <div className={styles.metaItem}>
                <span className={styles.icon}>💰</span> Lương TB: {major.salary}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </FilterLayout>
  );
}
