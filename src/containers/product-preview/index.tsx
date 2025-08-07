'use client';

import Image from 'next/image';
import { useMobile } from '@/contexts';
import styled from 'styled-components';

const Container = styled.div<{ $isMobile: boolean }>`
  overflow: ${({ $isMobile }) => ($isMobile ? 'unset' : 'hidden')};
`;

export const ProductPreview = () => {
  const { isMobile, screenWidth } = useMobile();

  const imageWidth = screenWidth * (isMobile ? 0.85 : 0.6);
  const imageHeight = imageWidth / (1440 / 900);

  return (
    <Container $isMobile={isMobile}>
      <Image
        src='/assets/renders/product_preview.png'
        alt='product'
        width={imageWidth}
        height={imageHeight}
        style={{
          objectFit: 'contain',
        }}
      />
    </Container>
  );
};
