import Link from 'next/link';
import styles from './InternalLink.module.css';

interface InternalLinkProps {
  href: string;
  text: string;
}

export default function InternalLink({ href, text }: InternalLinkProps) {
  return (
    <div className={styles.container}>
      <Link href={href} className={styles.ctaButton}>
        <span className={styles.icon}>👉</span>
        <span className={styles.text}>Xem chi tiết: {text}</span>
      </Link>
    </div>
  );
}
