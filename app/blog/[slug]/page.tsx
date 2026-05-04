import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from "next/link";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc';
import InternalLink from '../../../components/InternalLink/InternalLink';
import Script from "next/script";

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'data/blog');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(blogDir);
  } catch (error) {
    return [];
  }

  return filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => ({
      slug: filename.replace(/\.mdx$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const mdxPath = path.join(process.cwd(), 'data/blog', `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data } = matter(fileContent);
    if (data.title) {
      return { 
        title: data.title,
        description: data.description,
        alternates: {
          canonical: `/blog/${slug}`,
        },
      };
    }
  }

  return { 
    title: slug.replace(/-/g, ' ').toUpperCase(),
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogDeepPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const titlePath = slug.replace(/-/g, ' ').toUpperCase();

  const mdxPath = path.join(process.cwd(), 'data/blog', `${slug}.mdx`);

  // NẾU CÓ BÀI VIẾT .MDX CỤ THỂ -> RENDER NÓ
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContent);
    const remarkGfm = (await import('remark-gfm')).default;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title || titlePath,
      "description": data.description || "",
      "author": {
        "@type": "Person",
        "name": data.author || "Uni2Insight Team"
      },
      "datePublished": data.date || "2026-01-01",
      "image": data.image || "https://uni2insight.com/favicon.ico"
    };

    function rehypeImageToFigure() {
      return (tree: any) => {
        function walk(node: any) {
          if (!node.children) return;
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (child.type === 'element' && child.tagName === 'p') {
              const realChildren = child.children.filter(
                (c: any) => !(c.type === 'text' && c.value.trim() === '')
              );
              if (
                realChildren.length === 1 &&
                realChildren[0].type === 'element' &&
                realChildren[0].tagName === 'img'
              ) {
                const imgNode = realChildren[0];
                const title = imgNode.properties?.title;
                const figureChildren: any[] = [imgNode];
                if (title) {
                  figureChildren.push({
                    type: 'element',
                    tagName: 'figcaption',
                    properties: {},
                    children: [{ type: 'text', value: title }],
                  });
                  delete imgNode.properties.title;
                }
                node.children[i] = {
                  type: 'element',
                  tagName: 'figure',
                  properties: {},
                  children: figureChildren,
                };
              }
            }
            walk(child);
          }
        }
        walk(tree);
      };
    }

    return (
      <div className={styles.container}>
        <Script 
          id="schema-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <article className={styles.article}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/blog" style={{ display: 'inline-block', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
            ← Quay lại Blog Danh mục
          </Link>
        </div>

        <h1 className={styles.title}>
          {data.title || titlePath}
        </h1>
        
        <div className={styles.metaInfo}>
          <span>Đăng lúc: {data.date || 'Cập nhật mới nhất 2026'}</span> • <span>Tác giả: {data.author || 'Uni2Insight Team'}</span>
        </div>

        <div className={styles.content}>
          <MDXRemote 
            source={content} 
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeImageToFigure] } }} 
            components={{
              InternalLink,
              figure: ({ style, ...props }: any) => (
                <figure {...props} style={{ textAlign: 'center', margin: '1.5rem 0', ...style }} />
              ),
              figcaption: (props: any) => (
                <figcaption {...props} style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem', fontStyle: 'italic' }} />
              ),
              img: (props: any) => (
                <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block', margin: '0 auto', objectFit: 'contain' }} />
              ),
            }}
          />
        </div>

        <div className={styles.subscribeBox}>
          <h3>Đăng ký nhận thông báo</h3>
          <p>Nhận bài viết phân tích ngành mới nhất qua email.</p>
          <div className={styles.subscribeForm}>
            <input type="email" placeholder="Email của bạn..." className={styles.subscribeInput} />
            <button className={styles.subscribeBtn}>Đăng ký</button>
          </div>
        </div>
      </article>
      </div>
    );
  }

  // NẾU CHƯA CÓ BÀI VIẾT .MDX
  return (
    <div className={styles.container}>
      <article className={styles.article}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/blog" style={{ display: 'inline-block', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại Blog Danh mục
        </Link>
      </div>

      <h1 className={styles.title}>
        {titlePath}
      </h1>
      
      <div className={styles.metaInfo}>
        <span>Đăng lúc: Cập nhật mới nhất 2026</span> • <span>Tác giả: Uni2Insight Team</span>
      </div>

      <div className={styles.content}>
        <p>
          Xin chào! Bạn đang truy cập bài viết <strong>{titlePath}</strong>. 
          Hiện tại tính năng Blog chi tiết đang trong giai đoạn phát triển nội dung và hệ thống CMS.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Đội ngũ nội dung của Uni2Insight sẽ sớm cập nhật bài viết này với những phân tích chuyên sâu về thị trường lao động, xu hướng ngành nghề, và các số liệu báo cáo tin cậy nhất. Vui lòng đón chờ!
        </p>
      </div>

      <div className={styles.subscribeBox}>
        <h3>Đăng ký nhận thông báo</h3>
        <p>Nhận bài viết phân tích ngành mới nhất qua email.</p>
        <div className={styles.subscribeForm}>
          <input type="email" placeholder="Email của bạn..." className={styles.subscribeInput} />
          <button className={styles.subscribeBtn}>Đăng ký</button>
        </div>
      </div>
    </article>
    </div>
  );
}
