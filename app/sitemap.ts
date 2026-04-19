import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://uni2insight.com';
  const reviewsDir = path.join(process.cwd(), 'data/reviews');

  let schools: string[] = [];
  try {
    const filenames = fs.readdirSync(reviewsDir);
    schools = filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map((filename) => filename.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error("Could not read reviews directory", error);
  }

  // Danh sách các bài phụ (sub-articles) mà mỗi trường có
  const subArticles = ['hoc-phi', 'chuong-trinh', 'co-hoi-viec-lam', 'diem-chuan'];

  const schoolUrls: MetadataRoute.Sitemap = schools.map((school) => ({
    url: `${baseUrl}/review/${school}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const subArticleUrls: MetadataRoute.Sitemap = schools.flatMap((school) =>
    subArticles.map((sub) => ({
      url: `${baseUrl}/review/${school}/${sub}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/khu-vuc`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nganh-hoc`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tra-cuu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...schoolUrls,
    ...subArticleUrls,
  ];
}
