'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import { UnderlineText, Button } from '@/reuseable-components';

const PlanStatus = styled.div<{ isMobile: boolean }>`
  border-radius: 32px;
  padding: ${({ isMobile }) => (isMobile ? '2px 4px' : '4px 8px')};
  align-items: center;
  gap: 8px;
  border: 1px dashed rgba(249, 249, 249, 0.6);
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: ${({ isMobile }) => (isMobile ? '8px' : '10px')};
  font-style: normal;
  font-weight: 400;
  line-height: 133.333%; /*  */
  text-transform: uppercase;
  position: absolute;
  top: ${({ isMobile }) => (isMobile ? '-10px' : '-10px')};
  right: ${({ isMobile }) => (isMobile ? '-20px' : '-30px')};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const QuickStartButton = styled(Button)`
  @media (max-width: 900px) {
    padding: 8px 22px;
    width: 100%;
    .desktop {
      display: none;
    }
  }
`;
const MobileButtonContent = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    gap: 8px;
    span {
      font-size: 16px;
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
      <PlanStatus isMobile={isMobile}>{'open source'}</PlanStatus>
      <UnderlineText color={theme.colors.primary} className="desktop" size={20}>
        QUICK START
      </UnderlineText>
      <MobileButtonContent className="mobile">
        <UnderlineText color={theme.colors.primary} size={16}>
          QUICK START
        </UnderlineText>
      </MobileButtonContent>
    </QuickStartButton>
  );
};
