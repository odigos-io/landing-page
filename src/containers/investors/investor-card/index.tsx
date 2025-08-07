'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Text } from '@/components';
import { useMobile } from '@/contexts';
import { INVESTORS } from '@/constants';
import { useRouter } from 'next/navigation';
import { handleHrefClick } from '@/functions';
import { FlexColumn, FlexRow } from '@/styles';
import styled, { useTheme } from 'styled-components';

const Container = styled.div<{ $isMobile: boolean }>`
  max-width: ${({ theme, $isMobile }) => ($isMobile ? 'unset' : parseInt(theme.sizes.innerContentMaxWidth) / 2 - 64)}px;
  cursor: pointer;
`;

const WrapImage = styled.div<{ $isMobile: boolean; $isHovered: boolean }>`
  background-color: ${({ theme }) => theme.colors.grey_cold};
  border: 1px dashed ${({ theme, $isHovered }) => ($isHovered ? theme.colors.grey : theme.colors.grey_darker)};
  border-radius: 64px;
  min-width: ${({ $isMobile }) => ($isMobile ? '96px' : '200px')};
  min-height: ${({ $isMobile }) => ($isMobile ? '96px' : '120px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InvestorCard = ({ image, imageWidth, imageHeight, name, description, url }: (typeof INVESTORS)[number]) => {
  const theme = useTheme();
  const router = useRouter();
  const { isMobile } = useMobile();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container $isMobile={isMobile} onClick={() => handleHrefClick(url, router)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <FlexRow $gap={isMobile ? 24 : 32} $align='flex-start'>
        <WrapImage $isMobile={isMobile} $isHovered={isHovered}>
          <Image src={image} alt={name} width={(imageWidth || 80) / (isMobile ? 1.5 : 1)} height={(imageHeight || 80) / (isMobile ? 1.5 : 1)} />
        </WrapImage>

        <FlexColumn $gap={8}>
          <Text fontSize={isMobile ? 20 : 24} fontWeight={500} lineHeight='140%' style={{ textDecoration: isHovered ? 'underline' : 'none' }}>
            {name}
          </Text>
          <Text color={theme.colors.grey} fontSize={16} lineHeight='150%' style={{ textDecoration: isHovered ? 'underline' : 'none' }}>
            {description}
          </Text>
        </FlexColumn>
      </FlexRow>
    </Container>
  );
};
