import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = {
    blogs: [] as any[],
    majors: [] as any[]
  };

  try {
    // Read blogs
    const blogDir = path.join(process.cwd(), 'data/blog');
    if (fs.existsSync(blogDir)) {
      const blogFiles = fs.readdirSync(blogDir).filter(f => (f.endsWith('.md') || f.endsWith('.mdx')) && !f.startsWith('_'));
      data.blogs = blogFiles.map(filename => {
        const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf8');
        const { data: frontmatter } = matter(fileContent);
        return {
          slug: filename.replace(/\.mdx?$/, ''),
          title: frontmatter.title || "Bài Viết Blog",
          author: frontmatter.author,
          category: frontmatter.category,
          thumbnail: frontmatter.thumbnail || null,
        };
      });
    }

    // Read majors
    const majorsDir = path.join(process.cwd(), 'data/majors');
    if (fs.existsSync(majorsDir)) {
      const majorFiles = fs.readdirSync(majorsDir).filter(f => (f.endsWith('.md') || f.endsWith('.mdx')) && !f.startsWith('_'));
      data.majors = majorFiles.map(filename => {
        const fileContent = fs.readFileSync(path.join(majorsDir, filename), 'utf8');
        const { data: frontmatter } = matter(fileContent);
        return {
          slug: filename.replace(/\.mdx?$/, ''),
          title: frontmatter.title || "Ngành học",
          category: frontmatter.category,
          thumbnail: frontmatter.thumbnail || null,
        };
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Lỗi khi đọc file data cho API search", error);
    return NextResponse.json(data, { status: 500 });
  }
}
