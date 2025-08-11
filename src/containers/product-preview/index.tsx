'use client';

import Image from 'next/image';
import { useMobile } from '@/contexts';
import styled, { useTheme } from 'styled-components';

const Container = styled.div<{ $isMobile: boolean }>`
  overflow: ${({ $isMobile }) => ($isMobile ? 'unset' : 'hidden')};
`;

export const ProductPreview = () => {
  const theme = useTheme();
  const { isMobile, screenWidth } = useMobile();

  const imageWidth = screenWidth * (isMobile ? 0.85 : 0.55);
  const imageHeight = imageWidth / (3840 / 2160);

  return (
    <Container $isMobile={isMobile}>
      <Image
        src='/assets/renders/product_preview.png'
        alt='product'
        priority
        width={imageWidth}
        height={imageHeight}
        style={{
          objectFit: 'contain',
          borderRadius: '16px',
          border: `1px solid ${theme.colors.grey_darker}`,
        }}
      />
    </Container>
  );
};
