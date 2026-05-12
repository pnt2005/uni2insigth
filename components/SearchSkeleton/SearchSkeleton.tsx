import styles from './SearchSkeleton.module.css';

/** Skeleton loading card — dùng CSS animation shimmer */
function SkeletonItem() {
  return (
    <div className={styles.item} aria-hidden="true">
      <div className={`${styles.skeleton} ${styles.type}`} />
      <div className={`${styles.skeleton} ${styles.title}`} />
      <div className={`${styles.skeleton} ${styles.desc}`} />
      <div className={`${styles.skeleton} ${styles.descShort}`} />
    </div>
  );
}

interface SearchSkeletonProps {
  count?: number;
}

export default function SearchSkeleton({ count = 5 }: SearchSkeletonProps) {
  return (
    <div
      className={styles.list}
      role="status"
      aria-label="Đang tải kết quả…"
      aria-live="polite"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </div>
  );
}
