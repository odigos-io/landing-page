import React, { useState } from 'react';
import Image from 'next/image';
import { Tags } from '../tags';
import { Text } from '../text';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { useRouter } from 'next/navigation';
import { handleHrefClick } from '@/functions';
import { FlexColumn, hexOpacity } from '@/styles';

export * from './blog-card';

interface CardProps {
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  onImageError?: () => void;
  title: string;
  largeTitle?: boolean;
  description: string;
  tags?: string[];
  indexesOfBoldTags?: number[];
  href?: string;
}

const Container = styled.div<{
  $isMobile: boolean;
  $withClick: boolean;
  $isHovered: boolean;
}>`
  align-self: stretch;
  max-width: ${({ $isMobile }) => ($isMobile ? '100%' : '350px')};
  width: 100%;
  border-radius: 32px;
  border: 1px solid ${({ $isHovered, theme }) => ($isHovered ? theme.colors.grey : theme.colors.grey_darker)};
  background-color: ${({ theme }) => theme.colors.black_light};
  cursor: ${({ $withClick }) => ($withClick ? 'pointer' : 'default')};
`;

const TopHalf = styled.div<{ $isMobile: boolean }>`
  position: relative;
  width: 100%;
  height: 150px;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px 32px 0 0;
  background-color: ${({ theme }) => theme.colors.grey_darkest};
  overflow: hidden;
`;

const BottomHalf = styled(FlexColumn)<{ $isMobile: boolean }>`
  // 150px is the height of the top half, 48px is the padding of the top half, 48/64px is the padding of the bottom half
  min-height: calc(100% - 150px - 48px - ${({ $isMobile }) => ($isMobile ? '48px' : '64px')});
  width: ${({ $isMobile }) => ($isMobile ? 'calc(100% - 48px)' : 'calc(100% - 80px)')};
  padding: ${({ $isMobile }) => ($isMobile ? '24px 32px' : '32px 40px')};
  border-radius: 0 0 32px 32px;
`;

const Title = styled(Text)<{
  $isMobile: boolean;
  $isHovered: boolean;
  $isLarge?: boolean;
}>`
  font-size: ${({ $isMobile, $isLarge }) => ($isMobile ? ($isLarge ? '22px' : '18px') : $isLarge ? '28px' : '20px')};
  font-weight: 600;
  line-height: 120%;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: ${({ $isHovered }) => ($isHovered ? 'underline' : 'none')};
`;

const Description = styled(Text)<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  line-height: 120%;
  color: ${({ theme }) => theme.colors.off_white + hexOpacity['080']};
`;

export const Card = ({ image, imageWidth, imageHeight, onImageError, title, largeTitle, description, tags, indexesOfBoldTags, href }: CardProps) => {
  const router = useRouter();
  const { isMobile } = useMobile();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container
      $isMobile={isMobile}
      $withClick={!!href}
      onClick={() => href && handleHrefClick(href, router)}
      onMouseEnter={() => !!href && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      $isHovered={isHovered}
    >
      <TopHalf $isMobile={isMobile}>
        <Image
          suppressHydrationWarning
          src={image}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          fill={!imageWidth || !imageHeight}
          sizes='(max-width: 992px) 100vw, 350px'
          onError={() => onImageError?.()}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </TopHalf>
      <BottomHalf $isMobile={isMobile} $gap={isMobile ? 24 : 32} $justify='space-between'>
        <FlexColumn $gap={isMobile ? 8 : 16}>
          <Title $isMobile={isMobile} $isHovered={isHovered} $isLarge={largeTitle}>
            {title}
          </Title>
          <Description $isMobile={isMobile}>{description}</Description>
        </FlexColumn>

        <Tags id={title} tags={tags} indexesOfBoldTags={indexesOfBoldTags} />
      </BottomHalf>
    </Container>
  );
};
