'use client';

import React from 'react';
import { useMobile } from '@/contexts';
import { ContactUsButton } from '@/components';
import styled from 'styled-components';
import { FlexColumn } from '@/styles';

const Wrapper = styled.section<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: ${({ $isMobile }) => ($isMobile ? '24px 16px 0' : '42px 0 0')};
`;

const OuterBorder = styled.div<{ $isMobile: boolean }>`
  background: rgba(47, 18, 115, 0.8);
  border-radius: ${({ $isMobile }) => ($isMobile ? '16px 16px 0 0' : '23px 23px 0 0')};
  padding: ${({ $isMobile }) => ($isMobile ? '12px 12px 0 12px' : '20px 20px 0 20px')};
`;

const MiddleBorder = styled.div<{ $isMobile: boolean }>`
  background: rgba(77, 31, 169, 0.8);
  border-radius: ${({ $isMobile }) => ($isMobile ? '14px 14px 0 0' : '20px 20px 0 0')};
  padding: ${({ $isMobile }) => ($isMobile ? '12px 12px 0 12px' : '20px 20px 0 20px')};
`;

const InnerBorder = styled.div<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.purple_darker};
  border-radius: ${({ $isMobile }) => ($isMobile ? '12px 12px 0 0' : '17px 17px 0 0')};
  padding: ${({ $isMobile }) => ($isMobile ? '12px 12px 0 12px' : '20px 20px 0 20px')};
`;

const ContentCard = styled.div<{ $isMobile: boolean }>`
  background: #0c1926;
  border-radius: ${({ $isMobile }) => ($isMobile ? '14px 14px 0 0' : '20px 20px 0 0')};
  box-shadow: 0px 0px 44px 0px rgba(0, 0, 0, 0.35);
  padding: ${({ $isMobile }) => ($isMobile ? '32px 16px 48px' : '42px 32px 64px')};
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '772px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 42px;
`;

const Heading = styled.p<{ $isMobile: boolean }>`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '32px')};
  font-weight: 600;
  line-height: ${({ $isMobile }) => ($isMobile ? '34px' : '38px')};
  text-align: center;
`;

export const BottomCTA = () => {
  const { isMobile } = useMobile();

  return (
    <Wrapper $isMobile={isMobile}>
      <FlexColumn $align='center' $fullWidth>
        <OuterBorder $isMobile={isMobile}>
          <MiddleBorder $isMobile={isMobile}>
            <InnerBorder $isMobile={isMobile}>
              <ContentCard $isMobile={isMobile}>
                <Heading $isMobile={isMobile}>Visibility across all services and the{!isMobile && <br />} right context when you need it most</Heading>
                <ContactUsButton rightIconSrc='/assets/icons/arrow.svg' />
              </ContentCard>
            </InnerBorder>
          </MiddleBorder>
        </OuterBorder>
      </FlexColumn>
    </Wrapper>
  );
};
