import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownPageRenderer from '../../components/MarkdownPageRenderer/MarkdownPageRenderer';

export async function generateMetadata() {
  const filePath = path.join(process.cwd(), 'data/pages', 'terms.mdx');
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      title: data.title,
      description: data.description,
      alternates: { canonical: '/terms' },
    };
  } catch (error) {
    return { title: 'Điều khoản sử dụng - Uni2Insight' };
  }
}

export default async function TermsPage() {
  return <MarkdownPageRenderer slug="terms" />;
}
