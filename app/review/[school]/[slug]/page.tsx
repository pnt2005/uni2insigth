import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import styles from "../../Review.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc';
import InternalLink from '../../../../components/InternalLink/InternalLink';
import Script from "next/script";

export async function generateStaticParams() {
  const reviewsDir = path.join(process.cwd(), 'data/reviews');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(reviewsDir);
  } catch (error) {
    return [];
  }

  const schools = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => filename.replace(/\.mdx$/, ''));

  const defSlugs = ['hoc-phi', 'chuong-trinh', 'co-hoi-viec-lam', 'diem-chuan'];
  const params = [];

  for (const school of schools) {
    const schoolDir = path.join(reviewsDir, school);

    // Đọc tất cả các file MDX nếu trường đã tạo thư mục con
    if (fs.existsSync(schoolDir) && fs.statSync(schoolDir).isDirectory()) {
      const slugs = fs.readdirSync(schoolDir)
        .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
        .map(f => f.replace(/\.mdx?$/, ''));

      for (const slug of slugs) {
        params.push({ school, slug });
      }
    } else {
      // Nếu chưa có, vẫn generate ra các URL mặc định trên thanh sidebar để người dùng bấm vào không bị Lỗi Server (chỉ hiện trang Fallback)
      for (const slug of defSlugs) {
        params.push({ school, slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ school: string, slug: string }> }) {
  const resolvedParams = await params;
  const { school, slug } = resolvedParams;

  const mdxPath = path.join(process.cwd(), 'data/reviews', school, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data } = matter(fileContent);
    if (data.title) {
      return { 
        title: data.title,
        description: data.description,
        alternates: {
          canonical: `/review/${school}/${slug}`,
        },
      };
    }
  }

  const schoolName = "Đại học " + school.replace(/-/g, ' ').toUpperCase();
  let title = `Thông tin chi tiết ${schoolName}`;
  if (slug === 'hoc-phi') title = `Học phí ${schoolName}`;
  else if (slug === 'chuong-trinh') title = `Chương trình đào tạo ${schoolName}`;
  else if (slug === 'co-hoi-viec-lam') title = `Cơ hội việc làm ${schoolName}`;
  else if (slug === 'diem-chuan') title = `Điểm chuẩn ${schoolName}`;

  return { 
    title,
    alternates: {
      canonical: `/review/${school}/${slug}`,
    },
  };
}

export default async function SubArticlePage({ params }: { params: Promise<{ school: string, slug: string }> }) {
  const resolvedParams = await params;
  const { school, slug } = resolvedParams;

  // 1. Kiểm tra xem trường học này có tồn tại trong universities.json hay không
  try {
    const unisContent = fs.readFileSync(path.join(process.cwd(), 'data/universities.json'), 'utf8');
    const universityExists = JSON.parse(unisContent).some((u: any) => u.id === school);
    if (!universityExists) {
      notFound();
    }
  } catch (e) {
    notFound();
  }

  // 2. Kiểm tra xem slug có hợp lệ hay không (phải là các slug mặc định hoặc file mdx thực tế tồn tại)
  const defSlugs = ['hoc-phi', 'chuong-trinh', 'co-hoi-viec-lam', 'diem-chuan'];
  const schoolDir = path.join(process.cwd(), 'data/reviews', school);
  let isValidSlug = defSlugs.includes(slug);

  if (!isValidSlug && fs.existsSync(schoolDir) && fs.statSync(schoolDir).isDirectory()) {
    try {
      const existingSlugs = fs.readdirSync(schoolDir)
        .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
        .map(f => f.replace(/\.mdx?$/, ''));
      if (existingSlugs.includes(slug)) {
        isValidSlug = true;
      }
    } catch (e) {}
  }

  if (!isValidSlug) {
    notFound();
  }

  const schoolName = "Đại học " + school.replace(/-/g, ' ').toUpperCase();
  const mdxPath = path.join(process.cwd(), 'data/reviews', school, `${slug}.mdx`);

  // NẾU CÓ BÀI VIẾT .MDX CỤ THỂ -> RENDER NÓ
  if (fs.existsSync(mdxPath)) {
    const fileContent = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContent);

    // Bắt buộc khai báo GFM ngay trong scope nếu next-mdx-remote version 6 bắt import động hoặc để an toàn
    const remarkGfm = (await import('remark-gfm')).default;

    // Rehype plugin: unwrap <summary> nodes that remark incorrectly wraps in <p>
    // remark treats raw <summary> as inline HTML → injects <p> → React hydration error
    // Robust version: handles cases where remark puts extra text children alongside <summary>
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

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.description || "",
      "author": {
        "@type": "Organization",
        "name": "Uni2Insight"
      },
      "datePublished": data.date || "2026-01-01",
      "image": "https://uni2insight.com/favicon.ico"
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
      <article className={styles.article}>
        <Script 
          id="schema-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <div style={{ marginBottom: '2rem' }}>
          <Link href={`/review/${school}`} style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
            ← Quay lại bài review {data.name || schoolName}
          </Link>
        </div>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.content}>
          <MDXRemote
            source={content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeUnwrapSummary, rehypeImageToFigure] } }}
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

  // NẾU CHƯA CÓ BÀI VIẾT (Xóa toàn bộ hardcode cũ, chỉ giữ thông báo mặc định)
  return (
    <article className={styles.article}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href={`/review/${school}`} style={{ display: 'inline-block', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}>
          ← Quay lại bài review {schoolName}
        </Link>
      </div>

      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>✍️</span>
        <h1 className={styles.title} style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          Bài viết chi tiết đang được cập nhật
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Nội dung chuyên sâu về phân mục này cho {schoolName} hiện đang được đội ngũ ban biên tập Uni2Insight tổng hợp và sẽ ra mắt trong thời gian sớm nhất.
        </p>
      </div>
    </article>
  );
}
