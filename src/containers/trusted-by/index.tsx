'use client';

import React from 'react';
import Image from 'next/image';
import { useMobile } from '@/contexts';
import { CUSTOMERS } from '@/constants';
import { Button, Text } from '@/components';
import styled, { useTheme } from 'styled-components';
import { ConstrainedWrapper, FlexRow } from '@/styles';

const Content = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? 16 : 24)}px;
`;

export const TrustedBy = () => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <ConstrainedWrapper $isMobile={isMobile}>
      <Content $isMobile={isMobile}>
        <Text color={theme.colors.grey} fontSize={18} fontWeight={600} lineHeight='24px' noWrap>
          TRUSTED BY
        </Text>

        <FlexRow $gap={24} $wrap='wrap' $align='center' $justify='center'>
          {CUSTOMERS.map(({ src, alt, href, width, height }) => (
            <Button key={alt} href={href} variant='transparent' padding='0'>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Button>
          ))}
        </FlexRow>
      </Content>
    </ConstrainedWrapper>
  );
};
