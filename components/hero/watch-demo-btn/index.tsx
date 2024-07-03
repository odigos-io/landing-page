import React from 'react';
import styled from 'styled-components';
import { Button, UnderlineText, LazyImage } from '@/reuseable-components';

const WatchDemoButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary};
  @media (max-width: 600px) {
    padding: 8px 22px;
    .desktop {
      display: none;
    }
  }
`;
const MobileButtonContent = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
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
  return (
    <WatchDemoButton containerStyle={{ marginTop: 12 }} onClick={onClick}>
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
        <UnderlineText size={20}> DEMO</UnderlineText>
      </MobileButtonContent>
    </WatchDemoButton>
  );
};
