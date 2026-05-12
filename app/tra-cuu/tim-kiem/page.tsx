'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RedirectPage() {
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
