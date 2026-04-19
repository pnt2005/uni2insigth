import { redirect } from 'next/navigation';

export default function ReviewIndex() {
  // Redirect to search/filter page since /review itself doesn't have a list page yet
  redirect('/tra-cuu/tim-kiem');
}
