'use client';

import Image from 'next/image';
import { useMobile } from '@/contexts';
import { useTheme } from 'styled-components';

export const ProductPreview = () => {
  const theme = useTheme();
  const { isMobile, screenWidth } = useMobile();

  const imageWidth = screenWidth * (isMobile ? 0.85 : 0.45);
  const imageHeight = imageWidth / (1440 / 900);

  return (
    <Image
      src='/assets/renders/product_preview.svg'
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
  );
};
