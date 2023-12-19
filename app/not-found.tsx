'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';
import { Loader } from '@keyval-dev/design-system';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
}
