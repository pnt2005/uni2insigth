import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownPageRenderer from '../../components/MarkdownPageRenderer/MarkdownPageRenderer';

export async function generateMetadata() {
  const filePath = path.join(process.cwd(), 'data/pages', 'search-hub.mdx');
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      title: data.title,
      description: data.description,
      alternates: { canonical: '/search-hub' },
    };
  } catch (error) {
    return { title: 'Trung tâm tra cứu - Uni2Insight' };
  }
}

export default async function SearchHubPage() {
  return <MarkdownPageRenderer slug="search-hub" />;
}
