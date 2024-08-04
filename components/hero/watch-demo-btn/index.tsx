'use client';
import React, { use } from 'react';
import styled from 'styled-components';
import { UnderlineText, LazyImage, Button } from '@/reuseable-components';
import useIsMobile from '@/hooks/useIsMobile';

const WatchDemoButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
  width: 250px;
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

type WatchDemoBtnProps = {
  onClick: () => void;
};
export const WatchDemoBtn = ({ onClick }: WatchDemoBtnProps) => {
  const isMobile = useIsMobile(900);
  return (
    <WatchDemoButton
      containerStyle={{ width: isMobile ? '100%' : 253 }}
      onClick={onClick}
    >
      <UnderlineText className="desktop" size={20}>
        WATCH DEMO
      </UnderlineText>
      <MobileButtonContent className="mobile">
        <LazyImage
          width={20}
          height={20}
          src="/icons/hero/play.svg"
          alt="play"
        />
        <UnderlineText size={20}> WATCH DEMO</UnderlineText>
      </MobileButtonContent>
    </WatchDemoButton>
  );
};
