'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import styled from 'styled-components';

const Wrapper = styled.section<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $isMobile }) => ($isMobile ? '24px 16px' : '42px 0')};

  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
`;

const OuterBorder = styled.div<{ $isMobile: boolean }>`
  background: rgba(47, 18, 115, 0.8);
  border-radius: ${({ $isMobile }) => ($isMobile ? '16px' : '23px')};
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
`;

const MiddleBorder = styled.div<{ $isMobile: boolean }>`
  background: rgba(77, 31, 169, 0.8);
  border-radius: ${({ $isMobile }) => ($isMobile ? '14px' : '20px')};
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
`;

const InnerBorder = styled.div<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.purple_darker};
  border-radius: ${({ $isMobile }) => ($isMobile ? '12px' : '17px')};
  padding: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
`;

const ContentCard = styled.div<{ $isMobile: boolean }>`
  background: #0c1926;
  border-radius: ${({ $isMobile }) => ($isMobile ? '14px' : '20px')};
  box-shadow: 0px 0px 44px 0px rgba(0, 0, 0, 0.35);
  padding: ${({ $isMobile }) => ($isMobile ? '24px 16px' : '42px 32px')};
  max-width: 772px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatementText = styled.p<{ $isMobile: boolean }>`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ $isMobile }) => ($isMobile ? '20px' : '28px')};
  font-weight: 600;
  line-height: ${({ $isMobile }) => ($isMobile ? '34px' : '47px')};
  text-align: center;
`;

export const StatementCard = () => {
  const { isMobile } = useMobile();

  return (
    <Wrapper $isMobile={isMobile}>
      <OuterBorder $isMobile={isMobile}>
        <MiddleBorder $isMobile={isMobile}>
          <InnerBorder $isMobile={isMobile}>
            <ContentCard $isMobile={isMobile}>
              <StatementText $isMobile={isMobile}>
                Despite millions spent on observability,{!isMobile && <br />} the toughest problems persist.{!isMobile && <br />} AI is widening the gap.
              </StatementText>
            </ContentCard>
          </InnerBorder>
        </MiddleBorder>
      </OuterBorder>
    </Wrapper>
  );
};
