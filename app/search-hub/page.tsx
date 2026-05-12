import type { Metadata } from 'next';
import SearchHubClient from './SearchHubClient';

export const metadata: Metadata = {
  title: 'Tìm kiếm — Uni2Insight',
  description: 'Tìm kiếm thông tin ngành học, điểm chuẩn, học bổng và bài viết giáo dục tại Uni2Insight.',
  alternates: { canonical: '/search-hub' },
};

export default function SearchHubPage() {
  return <SearchHubClient />;
}
