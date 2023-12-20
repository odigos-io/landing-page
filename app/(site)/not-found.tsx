'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/design-system/loader/loader';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
}
