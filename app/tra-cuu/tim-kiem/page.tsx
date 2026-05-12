'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      router.replace(`/search-hub?q=${encodeURIComponent(q)}`);
    } else {
      router.replace('/search-hub');
    }
  }, [router, searchParams]);

  return null;
}

export default function RedirectPage() {
  return (
    <Suspense fallback={null}>
      <RedirectContent />
    </Suspense>
  );
}
