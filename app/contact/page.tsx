import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownPageRenderer from '../../components/MarkdownPageRenderer/MarkdownPageRenderer';

export async function generateMetadata() {
  const filePath = path.join(process.cwd(), 'data/pages', 'contact.mdx');
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      title: data.title,
      description: data.description,
      alternates: { canonical: '/contact' },
    };
  } catch (error) {
    return { title: 'Liên hệ - Uni2Insight' };
  }
}

export default async function ContactPage() {
  return <MarkdownPageRenderer slug="contact" />;
}
