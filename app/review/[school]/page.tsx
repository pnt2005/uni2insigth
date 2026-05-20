import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Script from 'next/script';
import styles from '../Review.module.css';
import InternalLink from '../../../components/InternalLink/InternalLink';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const reviewsDir = path.join(process.cwd(), 'data/reviews');
  try {
    const filenames = fs.readdirSync(reviewsDir);
    return filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map((filename) => ({
        school: filename.replace(/\.mdx$/, ''),
      }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ school: string }> }) {
  const resolvedParams = await params;
  const { school } = resolvedParams;
  const filePath = path.join(process.cwd(), 'data/reviews', `${school}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      title: data.title,
      description: data.description,
      alternates: {
        canonical: `/review/${school}`,
      },
    };
  } catch (error) {
    return {
      title: 'Review Trường Đại học',
      description: 'Đánh giá chi tiết và review thực tế về trường đại học, bao gồm thông tin về giảng viên, cơ sở vật chất, học phí và môi trường học tập.',
    };
  }
}

export default async function SchoolReviewPage({ params }: { params: Promise<{ school: string }> }) {
  const resolvedParams = await params;
  const { school } = resolvedParams;
  const filePath = path.join(process.cwd(), 'data/reviews', `${school}.mdx`);

  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    notFound();
  }

  const { data, content } = matter(fileContent);
  const schoolName = data.schoolName || 'Đại học';

  let universityData: any = null;
  try {
    const unisContent = fs.readFileSync(path.join(process.cwd(), 'data/universities.json'), 'utf8');
    universityData = JSON.parse(unisContent).find((u: any) => u.id === school);
  } catch (e) { }

  const tuitionText = universityData?.tuitionText || "Liên hệ để biết thêm chi tiết";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (data.faq || []).map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const collegeSchema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "name": universityData?.name || schoolName || data.title,
    "url": `https://uni2insight.com/review/${school}`,
    "image": universityData?.image || "https://uni2insight.com/favicon.ico",
    "description": data.description || `Thông tin review trường ${universityData?.name || schoolName}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Việt Nam",
      "streetAddress": universityData?.address || data.address || "Đang cập nhật địa chỉ"
    }
  };

  // Rehype plugin: unwrap <summary> nodes that remark incorrectly wraps in <p>
  // remark treats raw <summary> as inline HTML → injects <p> → React hydration error
  function rehypeUnwrapSummary() {
    return (tree: any) => {
      function walk(node: any) {
        if (!node.children) return;
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          const isP = (child.type === 'element' && child.tagName === 'p') ||
                      (child.type === 'mdxJsxFlowElement' && child.name === 'p');
          
          if (isP && child.children) {
            const summaryIdx = child.children.findIndex(
              (c: any) => (c.type === 'element' && c.tagName === 'summary') ||
                          (c.type === 'mdxJsxFlowElement' && c.name === 'summary') ||
                          (c.type === 'mdxJsxTextElement' && c.name === 'summary')
            );
            
            if (summaryIdx !== -1) {
              const summaryNode = child.children[summaryIdx];
              const rest = child.children.filter(
                (_: any, idx: number) => idx !== summaryIdx
              ).filter((c: any) => !(c.type === 'text' && c.value.trim() === ''));

              const replacements: any[] = [summaryNode];
              if (rest.length > 0) {
                replacements.push({ ...child, children: rest });
              }
              node.children.splice(i, 1, ...replacements);
              i += replacements.length - 1;
            }
          }
          walk(child);
        }
      }
      walk(tree);
    };
  }

  // Rehype plugin: transform <p><img title="caption"></p> → <figure><img><figcaption>caption</figcaption></figure>
  // Fixes hydration error caused by remark wrapping inline images in <p> tags.
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
            // <p> contains only a single <img>
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
                // Remove title from img so it doesn't render as tooltip
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
    <article className={styles.article}>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="college-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }}
      />

      <h1 className={styles.title}>{data.title}</h1>

      {(universityData?.address || data.address) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{universityData?.address || data.address}</span>
        </div>
      )}

      <div className={styles.metaTags}>
        <span className={styles.tag}>Đánh giá sinh viên</span>
        <span className={styles.tag}>Hướng nghiệp</span>
        <span className={styles.tag}>Mới nhất 2026</span>
      </div>

      <div className={styles.content}>
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [(await import('remark-gfm')).default],
              rehypePlugins: [rehypeUnwrapSummary, rehypeImageToFigure],
            }
          }}
          components={{
            InternalLink,
            figure: ({ style, ...props }: any) => (
              <figure {...props} style={{ textAlign: 'center', margin: '2rem 0', ...style }} />
            ),
            figcaption: (props: any) => (
              <figcaption {...props} style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem', fontStyle: 'italic' }} />
            ),
            img: (props: any) => (
              <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', display: 'block', margin: '0 auto', objectFit: 'contain' }} />
            ),
          }}
        />
      </div>
    </article>
  );
}
