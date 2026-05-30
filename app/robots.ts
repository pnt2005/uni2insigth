import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',      // Chặn Bot crawl dữ liệu API thô
        '/search-hub?*', // Chặn các trang tìm kiếm để tránh Duplicate Content
        '/search/',   // Chặn các trang tìm kiếm
        '/_next/',    // Chặn các tệp cấu hình hệ thống của Next.js
        '/login',     // Chặn Bot truy cập trang đăng nhập cũ/hệ thống
      ],
    },
    sitemap: 'https://uni2insight.com/sitemap.xml',
  };
}
