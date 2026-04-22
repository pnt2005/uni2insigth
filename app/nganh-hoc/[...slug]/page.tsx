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
      keywords: data.keywords,
    };
  }

  return { title: slug.replace(/-/g, ' ').toUpperCase() };
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
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} 
            components={{
              InternalLink,
              img: (props: any) => (
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0', width: '100%' }}>
                  <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block', objectFit: 'contain' }} />
                  {props.alt && (
                    <em style={{ display: 'block', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                      {props.alt}
                    </em>
                  )}
                </span>
              )
            }}
          />
      </article>
    </div>
  );
}
