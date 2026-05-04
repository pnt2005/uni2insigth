import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './page.module.css';
import InternalLink from '../../../components/InternalLink/InternalLink';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPaths = resolvedParams.slug;
  const slug = slugPaths[slugPaths.length - 1];
  
  const mdxPath = path.join(process.cwd(), 'data/majors', `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data } = matter(fileContent);
    return { 
      title: data.title || data.majorName || slug.replace(/-/g, ' ').toUpperCase(),
      description: data.description,
      alternates: {
        canonical: `/nganh-hoc/${slugPaths.join('/')}`,
      },
    };
  }

  return { 
    title: slug.replace(/-/g, ' ').toUpperCase(),
    alternates: {
      canonical: `/nganh-hoc/${slugPaths.join('/')}`,
    },
  };
}

export default async function NganhHocDeepPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPaths = resolvedParams.slug;
  const slug = slugPaths[slugPaths.length - 1];
  const category = slugPaths.length > 1 ? slugPaths[0] : null;

  const mdxPath = path.join(process.cwd(), 'data/majors', `${slug}.mdx`);

  if (!fs.existsSync(mdxPath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(mdxPath, 'utf8');
  const { data, content } = matter(fileContent);
  const remarkGfm = (await import('remark-gfm')).default;

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
      <article className={styles.article}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/nganh-hoc" style={{ display: 'inline-block', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
            ← Quay lại Danh sách Ngành học
          </Link>
        </div>

        <header className={styles.header}>
          {category && (
            <div className={styles.category}>
              {category.replace(/-/g, ' ')}
            </div>
          )}
          <h1 className={styles.title}>
            {data.title || data.majorName || slug.replace(/-/g, ' ').toUpperCase()}
          </h1>
          {data.description && (
            <p className={styles.description}>
              {data.description}
            </p>
          )}
          
          {(data.salaryRange || data.schools) && (
            <div className={styles.metaTags}>
              {data.salaryRange && (
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>💰</span>
                  <div>
                    <div className={styles.metaLabel}>Mức lương trung bình</div>
                    <div className={styles.metaValue}>{data.salaryRange}</div>
                  </div>
                </div>
              )}
              {data.schools && (
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>🏫</span>
                  <div>
                    <div className={styles.metaLabel}>Trường đào tạo</div>
                    <div className={styles.metaValue}>{data.schools} trường</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </header>

        <div className={styles.content}>
          <MDXRemote 
            source={content} 
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeImageToFigure] } }} 
            components={{
              InternalLink,
              figure: ({ style, ...props }: any) => (
                <figure {...props} style={{ textAlign: 'center', margin: '2rem 0', ...style }} />
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
      </article>
    </div>
  );
}
