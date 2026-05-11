import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownPageRenderer from '../../components/MarkdownPageRenderer/MarkdownPageRenderer';

export async function generateMetadata() {
  const filePath = path.join(process.cwd(), 'data/pages', 'privacy.mdx');
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      title: data.title,
      description: data.description,
      alternates: { canonical: '/privacy' },
    };
  } catch (error) {
    return { title: 'Chính sách bảo mật - Uni2Insight' };
  }
}

export default async function PrivacyPage() {
  return <MarkdownPageRenderer slug="privacy" />;
}
