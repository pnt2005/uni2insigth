import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://uni2insight.com';

/**
 * Helper: Lấy thời gian sửa file. 
 * Nếu không thấy file, trả về thời gian build hiện tại.
 */
function getFileTime(relativeFilePath: string): Date {
  try {
    const fullPath = path.join(process.cwd(), relativeFilePath);
    if (fs.existsSync(fullPath)) {
      return fs.statSync(fullPath).mtime;
    }
  } catch (e) { }
  return new Date();
}

function getValidSlugs(dir: string) {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) return [];

  return fs.readdirSync(fullPath).filter((file) =>
    file.endsWith('.mdx') && !file.startsWith('_')
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // --- 1. XỬ LÝ REVIEWS & SUB-ARTICLES ---
  const reviewsDir = 'data/reviews';
  const schoolFiles = getValidSlugs(reviewsDir);

  const reviewEntries: MetadataRoute.Sitemap = [];

  schoolFiles.forEach((filename) => {
    const id = filename.replace(/\.mdx$/, '');
    const schoolFilePath = path.join(reviewsDir, filename);

    // Trang Review chính (Trường học)
    reviewEntries.push({
      url: `${BASE_URL}/review/${id}`,
      lastModified: getFileTime(schoolFilePath),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Các bài viết phụ (Chỉ add nếu file mdx tồn tại trong sub-folder)
    const subArticles = ['hoc-phi', 'chuong-trinh', 'co-hoi-viec-lam', 'diem-chuan'];
    subArticles.forEach((sub) => {
      const subPath = path.join(reviewsDir, id, `${sub}.mdx`);
      if (fs.existsSync(path.join(process.cwd(), subPath))) {
        reviewEntries.push({
          url: `${BASE_URL}/review/${id}/${sub}`,
          lastModified: getFileTime(subPath),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    });
  });

  // --- 2. XỬ LÝ BLOG ---
  const blogFiles = getValidSlugs('data/blog');
  const blogEntries: MetadataRoute.Sitemap = blogFiles.map((f) => ({
    url: `${BASE_URL}/blog/${f.replace(/\.mdx$/, '')}`,
    lastModified: getFileTime(path.join('data/blog', f)),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // --- 3. XỬ LÝ NGÀNH HỌC ---
  const majorFiles = getValidSlugs('data/majors');
  const majorEntries: MetadataRoute.Sitemap = majorFiles.map((f) => ({
    url: `${BASE_URL}/nganh-hoc/${f.replace(/\.mdx$/, '')}`,
    lastModified: getFileTime(path.join('data/majors', f)),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // --- 4. TRANG TĨNH ---
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/khu-vuc`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/nganh-hoc`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tra-cuu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];

  return [
    ...staticPages,
    ...reviewEntries,
    ...blogEntries,
    ...majorEntries,
  ];
}