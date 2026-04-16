'use client';

import React from 'react';
import Image from 'next/image';
import { Text } from '@/components';
import { useMobile } from '@/contexts';
import { CUSTOMERS } from '@/constants';
import Marquee from 'react-fast-marquee';
import styled, { useTheme } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 16px 0;
`;

const LogoItem = styled.a<{ $gap: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: ${({ $gap }) => $gap}px;
  opacity: 0.7;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

export const TrustedBy = () => {
  const theme = useTheme();
  const { isMobile } = useMobile();
  const gap = isMobile ? 32 : 42;

  return (
    <Wrapper>
      <Text color={theme.colors.grey} fontSize={18} fontWeight={600} lineHeight='24px' noWrap>
        TRUSTED BY
      </Text>

      <Marquee speed={40} pauseOnHover autoFill>
        {CUSTOMERS.map(({ src, alt, href, width, height }) => (
          <LogoItem key={alt} href={href} target='_blank' rel='noopener noreferrer' $gap={gap}>
            <Image src={src} alt={alt} width={width} height={height} />
          </LogoItem>
        ))}
      </Marquee>
    </Wrapper>
  );
};
