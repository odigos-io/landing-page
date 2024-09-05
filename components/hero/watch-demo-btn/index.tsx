'use client';
import React from 'react';
import styled from 'styled-components';
import { UnderlineText, LazyImage } from '@/reuseable-components';

const ButtonWrapper = styled.div`
  display: flex;
  padding: 8px 32px;
  max-width: 253px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  cursor: pointer;
  border-radius: 48px;
  transition: background 0.3s;
  @media (max-width: 1000px) {
    max-width: 100%;
  }
  &:hover {
    background: rgba(68, 74, 217, 0.12);
  }
`;

type WatchDemoBtnProps = {
  onClick: () => void;
};
export const WatchDemoBtn = ({ onClick }: WatchDemoBtnProps) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <LazyImage width={24} height={24} src="/icons/hero/play.svg" alt="play" />
      <UnderlineText size={20}>WATCH DEMO</UnderlineText>
    </ButtonWrapper>
  );
};
