import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://uni2insight.com';

// ===== CONFIG =====
const MIN_CONTENT_LENGTH = 300; // filter content mỏng
const ENABLE_SUB_PAGES = false;

// ===== HELPER =====
function getFileTime(relativePath: string): Date | undefined {
  try {
    const fullPath = path.join(process.cwd(), relativePath);
    if (fs.existsSync(fullPath)) {
      return fs.statSync(fullPath).mtime;
    }
  } catch { }
  return undefined;
}

function getFiles(dir: string): string[] {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter(
    (f) => f.endsWith('.mdx') && !f.startsWith('_')
  );
}

// ===== PARSE FRONTMATTER =====
function parseFrontmatter(content: string) {
  const match = content.match(/---([\s\S]*?)---/);
  if (!match) return {};

  const lines = match[1].split('\n');
  const data: any = {};

  lines.forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (!key) return;
    data[key.trim()] = rest.join(':').trim();
  });

  return data;
}

// ===== QUALITY FILTER =====
function isHighQuality(filePath: string): boolean {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');

    // 1. length check
    if (content.length < MIN_CONTENT_LENGTH) return false;

    // 2. frontmatter check
    const meta = parseFrontmatter(content);

    if (meta.noindex === 'true') return false;
    if (meta.published === 'false') return false;

    return true;
  } catch {
    return false;
  }
}

// ===== MAIN =====
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  // ===== STATIC =====
  const staticPages = [
    '',
    '/khu-vuc',
    '/nganh-hoc',
    '/search-hub',
    '/blog',
  ];

  staticPages.forEach((p) => {
    urls.push({
      url: `${BASE_URL}${p}`,
      lastModified: new Date(),
    });
  });

  // ===== REVIEWS =====
  const reviewFiles = getFiles('data/reviews');

  reviewFiles.forEach((file) => {
    const id = file.replace('.mdx', '');
    const filePath = `data/reviews/${file}`;

    if (!isHighQuality(filePath)) return;

    urls.push({
      url: `${BASE_URL}/review/${id}`,
      lastModified: getFileTime(filePath),
    });

    // 🔥 SUB PAGES (OPTIONAL)
    if (ENABLE_SUB_PAGES) {
      const subs = ['hoc-phi', 'chuong-trinh', 'co-hoi-viec-lam', 'diem-chuan'];

      subs.forEach((sub) => {
        const subPath = `data/reviews/${id}/${sub}.mdx`;

        if (!fs.existsSync(path.join(process.cwd(), subPath))) return;
        if (!isHighQuality(subPath)) return;

        urls.push({
          url: `${BASE_URL}/review/${id}/${sub}`,
          lastModified: getFileTime(subPath),
        });
      });
    }
  });

  // ===== BLOG =====
  const blogFiles = getFiles('data/blog');

  blogFiles.forEach((file) => {
    const filePath = `data/blog/${file}`;
    if (!isHighQuality(filePath)) return;

    urls.push({
      url: `${BASE_URL}/blog/${file.replace('.mdx', '')}`,
      lastModified: getFileTime(filePath),
    });
  });

  // ===== MAJORS =====
  const majorFiles = getFiles('data/majors');

  majorFiles.forEach((file) => {
    const filePath = `data/majors/${file}`;
    if (!isHighQuality(filePath)) return;

    urls.push({
      url: `${BASE_URL}/nganh-hoc/${file.replace('.mdx', '')}`,
      lastModified: getFileTime(filePath),
    });
  });

  return urls;
}