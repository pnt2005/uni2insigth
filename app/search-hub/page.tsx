import type { Metadata } from 'next';
import SearchHubClient from './SearchHubClient';
import styles from './search.module.css';

export const metadata: Metadata = {
  title: 'Tìm Kiếm Thông Tin Đại Học Nhanh Chóng | Uni2Insight',
  description: 'Tìm kiếm thông tin ngành học, điểm chuẩn, học bổng và bài viết giáo dục tại Uni2Insight.',
  alternates: { canonical: '/search-hub' },
};

export default function SearchHubPage() {
  return (
    <div className={styles.searchPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Tra cứu thông tin</h1>
        <SearchHubClient />
      </div>
    </div>
  );
}
