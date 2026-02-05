'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { ConstrainedWrapper } from '@/styles';

const SectionWrapper = styled.section<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.black};
  padding: ${({ $isMobile }) => ($isMobile ? '40px 16px' : '64px 20px')};
`;

const ContentWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
`;

const HeaderWrapper = styled.div<{ $isMobile: boolean }>`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.cyan};
`;

const Title = styled.h2<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 28 : 40)}px;
  font-weight: 600;
  line-height: 120%;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;

const Description = styled.p<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 14 : 16)}px;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.grey_lighter};
  margin: 0;
  text-align: center;
`;

const TagsWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const Tag = styled.span<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.grey_darkest};
  border: none;
  border-radius: 8px;
  padding: ${({ $isMobile }) => ($isMobile ? '12px 16px' : '16px 24px')};
  font-size: ${({ $isMobile }) => ($isMobile ? 14 : 16)}px;
  color: ${({ theme }) => theme.colors.white};
  white-space: ${({ $isMobile }) => ($isMobile ? 'normal' : 'nowrap')};
  text-align: center;
`;

interface WhoShouldAttendProps {
  roles: string[];
}

export const WhoShouldAttend = ({ roles }: WhoShouldAttendProps) => {
  const { isMobile } = useMobile();

  return (
    <SectionWrapper $isMobile={isMobile}>
      <ConstrainedWrapper $isMobile={isMobile}>
        <ContentWrapper $isMobile={isMobile}>
          <HeaderWrapper $isMobile={isMobile}>
            <Label>Who Should Attend</Label>
            <Title $isMobile={isMobile}>Built for Observability Leaders</Title>
          </HeaderWrapper>

          <Description $isMobile={isMobile}>
            This exclusive dinner is designed for senior technology executives and engineering leaders who are shaping
            the future of their organization&apos;s infrastructure and observability strategy.
          </Description>

          <TagsWrapper $isMobile={isMobile}>
            {roles.map((role, index) => (
              <Tag key={index} $isMobile={isMobile}>{role}</Tag>
            ))}
          </TagsWrapper>
        </ContentWrapper>
      </ConstrainedWrapper>
    </SectionWrapper>
  );
};
