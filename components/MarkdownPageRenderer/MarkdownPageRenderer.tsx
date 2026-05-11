import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import InternalLink from '../InternalLink/InternalLink';
import styles from '../../app/blog/[slug]/page.module.css';

// Plugin xử lý ảnh (bọc img trong figure) tránh lỗi hydration
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

// Plugin xử lý thẻ summary
function rehypeUnwrapSummary() {
  return (tree: any) => {
    function walk(node: any) {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === 'element' && child.tagName === 'p' && child.children) {
          const summaryIdx = child.children.findIndex(
            (c: any) => c.type === 'element' && c.tagName === 'summary'
          );
          if (summaryIdx !== -1) {
            const summaryNode = child.children[summaryIdx];
            const rest = child.children.filter(
              (_: any, idx: number) => idx !== summaryIdx
            ).filter((c: any) => !(c.type === 'text' && c.value.trim() === ''));
            const replacements: any[] = [summaryNode];
            if (rest.length > 0) {
              replacements.push({ type: 'element', tagName: 'p', properties: {}, children: rest });
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

export default async function MarkdownPageRenderer({ slug, folder = 'data/pages' }: { slug: string, folder?: string }) {
  const filePath = path.join(process.cwd(), folder, `${slug}.mdx`);
  
  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    notFound();
  }

  const { data, content } = matter(fileContent);
  const remarkGfm = (await import('remark-gfm')).default;

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.content}>
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
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
    </div>
  );
}
