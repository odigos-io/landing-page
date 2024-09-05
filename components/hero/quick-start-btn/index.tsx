'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import { UnderlineText, Button, Text } from '@/reuseable-components';

const QuickStartButton = styled(Button)`
  display: flex;
  flex-direction: column;
  height: 64px;
  gap: 0px;
  @media (max-width: 900px) {
    padding: 8px 22px;
    width: 100%;
    .desktop {
      display: none;
    }
  }
`;

export const QuickStartBtn = () => {
  const isMobile = useIsMobile(900);

  function handleClick() {
    window.open('https://docs.odigos.io/quickstart/introduction', '_blank');
  }

  return (
    <QuickStartButton
      containerStyle={{ width: isMobile ? '100%' : 253 }}
      onClick={handleClick}
      variant="secondary"
    >
      <UnderlineText color={theme.colors.primary} size={20}>
        QUICK START
      </UnderlineText>
      <Text
        size={10}
        weight={500}
        color={theme.colors.primary}
        style={{ letterSpacing: '0.1px' }}
      >
        OPEN SOURCE
      </Text>
      {/* <MobileButtonContent className="mobile">
        <UnderlineText color={theme.colors.primary} size={16}>
          QUICK START
        </UnderlineText>
      </MobileButtonContent> */}
    </QuickStartButton>
  );
};
