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
      keywords: data.keywords,
    };
  } catch (error) {
    return {
      title: 'Review Trường Đại học',
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
  } catch (e) {}

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

  return (
    <article className={styles.article}>
      <Script 
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h1 className={styles.title}>{data.title}</h1>
      
      <div className={styles.metaTags}>
        <span className={styles.tag}>Đánh giá sinh viên</span>
        <span className={styles.tag}>Hướng nghiệp</span>
        <span className={styles.tag}>Mới nhất 2026</span>
      </div>

      <div className={styles.content}>
        <MDXRemote 
          source={content} 
          options={{ mdxOptions: { remarkPlugins: [(await import('remark-gfm')).default] } }} 
          components={{
            img: (props: any) => (
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0', width: '100%' }}>
                <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', display: 'block', objectFit: 'contain' }} />
                {props.alt && (
                  <em style={{ display: 'block', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                    {props.alt}
                  </em>
                )}
              </span>
            )
          }}
        />

        {/* You can still insert dynamic InternalLink statically if MDX doesn't have it, or modify MDX to allow custom components */}
      

        {data.faq && data.faq.length > 0 && (
          <div className={`${styles.faqSection}`} id="faq">
            <h2>Câu hỏi thường gặp (FAQ)</h2>
            {data.faq.map((item: any, idx: number) => (
              <div className={styles.faqItem} key={idx}>
                <div className={styles.faqQuestion}>{item.question}</div>
                <div className={styles.faqAnswer}>{item.answer}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
