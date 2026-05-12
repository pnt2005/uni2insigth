import { School, FileText, File, ArrowUpRight } from 'lucide-react';
import styles from './SearchResult.module.css';

interface SearchResultProps {
  type: string;
  title: string;
  description: string;
  href: string;
  query: string;
}

/**
 * Highlight phần text khớp với query trong kết quả tìm kiếm.
 * Tách text theo pattern regex và bọc phần khớp trong <mark>.
 */
function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(
    `(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part
      )}
    </>
  );
}

export default function SearchResult({ type, title, description, href, query }: SearchResultProps) {
  const Icon = type === 'Trường đại học' ? School : (type === 'Bài viết' ? FileText : File);

  return (
    <article className={styles.item}>
      <div className={styles.itemType}>
        <Icon size={14} strokeWidth={2.5} />
        {type}
      </div>
      <h3 className={styles.itemTitle}>
        <a href={href}>
          <Highlighted text={title} query={query} />
          <ArrowUpRight size={18} className={styles.titleIcon} />
        </a>
      </h3>
      <p className={styles.itemDesc}>
        <Highlighted text={description} query={query} />
      </p>
    </article>
  );
}
