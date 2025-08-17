'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useMobile } from '@/contexts';

interface BannerImageProps {
  src: string;
  alt: string;
  fallbackImage: string;
}

const WrapImage = styled.div<{ $isMobile: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? '150px' : '250px')};
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  border: none;
  background-color: ${({ theme }) => theme.colors.black_lighter};
  overflow: hidden;
`;

export const BannerImage = ({ src, alt, fallbackImage }: BannerImageProps) => {
  const { isMobile } = useMobile();

  const [image, setImage] = useState(src || fallbackImage);
  const [imageInvalid, setImageInvalid] = useState(false);

  useEffect(() => {
    if (imageInvalid) {
      setImage(fallbackImage);
    } else {
      setImage(src || fallbackImage);
    }
  }, [imageInvalid, src, fallbackImage]);

  return (
    <WrapImage $isMobile={isMobile}>
      <Image
        suppressHydrationWarning
        src={image}
        alt={alt}
        priority
        fill
        sizes='(max-width: 992px) 100vw, 1080px'
        onError={() => setImageInvalid(true)}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </WrapImage>
  );
};
