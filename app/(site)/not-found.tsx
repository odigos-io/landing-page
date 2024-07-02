'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      page not found
    </div>
  );
}
