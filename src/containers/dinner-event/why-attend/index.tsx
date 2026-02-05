'use client';

import React from 'react';
import styled from 'styled-components';
import { useMobile } from '@/contexts';
import { ConstrainedWrapper, FlexColumn } from '@/styles';

const SectionWrapper = styled.section<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.black};
  padding: ${({ $isMobile }) => ($isMobile ? '40px 16px' : '64px 20px')};
`;

const ContentWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? 32 : 48)}px;
`;

const HeaderWrapper = styled.div`
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

const CardsGrid = styled.div<{ $isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isMobile }) => ($isMobile ? '1fr' : 'repeat(3, 1fr)')};
  gap: 24px;
  width: 100%;
  max-width: 1080px;
`;

const Card = styled.div<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.grey_cold};
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
  border-radius: 16px;
  padding: ${({ $isMobile }) => ($isMobile ? 24 : 32)}px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.cyan};
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  line-height: 160%;
  color: ${({ theme }) => theme.colors.grey_lighter};
  margin: 0;
`;

// Icons for each card type
const NetworkingIcon = () => (
  <svg width="48" height="48" viewBox="0 0 49 48" fill="none">
    <path d="M10.2011 21.0323C7.70907 19.6771 6.01758 17.0358 6.01758 13.9996C6.01758 10.9633 7.70911 8.32201 10.2012 6.9668M6.07631 30.8339C3.6654 32.0811 2.01758 34.5979 2.01758 37.4996C2.01758 39.5726 3.41933 41.3182 5.32669 41.8403M42.7085 41.8403C44.6158 41.3182 46.0176 39.5726 46.0176 37.4996C46.0176 34.5979 44.3698 32.0811 41.9589 30.8339M37.834 21.0323C40.3261 19.6771 42.0176 17.0358 42.0176 13.9996C42.0176 10.9632 40.3261 8.32202 37.8339 6.9668M32.0176 14C32.0176 18.4183 28.4359 22 24.0176 22C19.5993 22 16.0176 18.4183 16.0176 14C16.0176 9.58172 19.5993 6 24.0176 6C28.4359 6 32.0176 9.58172 32.0176 14ZM16.5176 42H31.5176C34.0029 42 36.0176 39.9853 36.0176 37.5C36.0176 33.3579 32.6597 30 28.5176 30H19.5176C15.3754 30 12.0176 33.3579 12.0176 37.5C12.0176 39.9853 14.0323 42 16.5176 42Z" stroke="#73F8ED" strokeWidth="4.03422" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InsightsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 49" fill="none">
    <path d="M20.7578 42.0171H27.242M24 4.01709V2.01709M38 9.4313L39.4142 8.01709M9.41421 9.4313L8 8.01709M44 22.0171H42M6 22.0171H4M12.6254 20.953C12.6254 14.9069 17.7182 10.0056 24.0004 10.0056C30.2826 10.0056 35.3754 14.9069 35.3754 20.953C35.3754 24.2672 33.8452 27.2374 31.4276 29.2449C30.4064 30.0929 29.5285 31.1457 29.1947 32.4304L28.74 34.181C28.4609 35.2555 27.491 36.0056 26.3808 36.0056H21.62C20.5098 36.0056 19.5399 35.2555 19.2608 34.181L18.806 32.4304C18.4723 31.1457 17.5944 30.0929 16.5732 29.2449C14.1556 27.2374 12.6254 24.2672 12.6254 20.953Z" stroke="#73F8ED" strokeWidth="4.03422" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExperienceIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M17.1546 11.5274C18.074 9.74127 18.5337 8.84823 19.1513 8.55888C19.6889 8.30696 20.3107 8.30696 20.8484 8.55888C21.4659 8.84823 21.9256 9.74127 22.845 11.5274L25.2284 16.1575C25.3877 16.467 25.4673 16.6217 25.5703 16.7583C25.6618 16.8796 25.7668 16.9901 25.8832 17.0876C26.0144 17.1975 26.1649 17.2849 26.4658 17.4598L31.2385 20.2332C32.8024 21.142 33.5843 21.5963 33.8472 22.1886C34.0765 22.7052 34.0765 23.2948 33.8472 23.8114C33.5843 24.4037 32.8024 24.858 31.2385 25.7668L26.4658 28.5402C26.1649 28.7151 26.0144 28.8025 25.8832 28.9124C25.7668 29.0099 25.6618 29.1204 25.5703 29.2417C25.4673 29.3783 25.3877 29.533 25.2284 29.8425L22.845 34.4726C21.9256 36.2587 21.4659 37.1518 20.8484 37.4411C20.3107 37.693 19.6889 37.693 19.1513 37.4411C18.5337 37.1518 18.074 36.2587 17.1546 34.4726L14.7713 29.8425C14.612 29.533 14.5323 29.3783 14.4293 29.2417C14.3378 29.1204 14.2329 29.0099 14.1164 28.9124C13.9852 28.8025 13.8348 28.7151 13.5338 28.5402L8.76109 25.7668C7.19727 24.858 6.41536 24.4037 6.15247 23.8114C5.92314 23.2948 5.92314 22.7052 6.15247 22.1886C6.41536 21.5963 7.19727 21.142 8.76109 20.2332L13.5338 17.4598C13.8348 17.2849 13.9852 17.1975 14.1164 17.0876C14.2329 16.9901 14.3378 16.8796 14.4293 16.7583C14.5323 16.6217 14.612 16.467 14.7713 16.1575L17.1546 11.5274Z" stroke="#73F8ED" strokeWidth="4.03422" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34.9189 38.8123C34.4114 38.178 34.1576 37.8608 34.0625 37.495C33.9789 37.1733 33.9789 36.8267 34.0625 36.505C34.1576 36.1392 34.4114 35.822 34.9189 35.1877L36.55 33.1488C37.0575 32.5144 37.3112 32.1972 37.6038 32.0784C37.8612 31.9739 38.1384 31.9739 38.3958 32.0784C38.6884 32.1972 38.9422 32.5144 39.4497 33.1488L41.0808 35.1877C41.5883 35.822 41.842 36.1392 41.9371 36.505C42.0207 36.8267 42.0207 37.1733 41.9371 37.495C41.842 37.8608 41.5883 38.178 41.0808 38.8123L39.4497 40.8512C38.9422 41.4856 38.6884 41.8028 38.3958 41.9216C38.1384 42.0261 37.8612 42.0261 37.6038 41.9216C37.3112 41.8028 37.0575 41.4856 36.55 40.8512L34.9189 38.8123Z" stroke="#73F8ED" strokeWidth="4.03422" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36.4593 8.72493C36.2056 8.47118 36.0787 8.34431 36.0312 8.198C35.9894 8.06931 35.9894 7.93069 36.0312 7.802C36.0787 7.65569 36.2056 7.52882 36.4593 7.27507L37.2749 6.45952C37.5286 6.20577 37.6555 6.0789 37.8018 6.03136C37.9305 5.98955 38.0691 5.98955 38.1978 6.03136C38.3441 6.0789 38.471 6.20577 38.7247 6.45952L39.5403 7.27507C39.794 7.52882 39.9209 7.65569 39.9685 7.802C40.0103 7.93069 40.0103 8.06931 39.9685 8.198C39.9209 8.34431 39.794 8.47118 39.5403 8.72493L38.7247 9.54048C38.471 9.79423 38.3441 9.9211 38.1978 9.96864C38.0691 10.0105 37.9305 10.0105 37.8018 9.96864C37.6555 9.9211 37.5286 9.79423 37.2749 9.54048L36.4593 8.72493Z" stroke="#73F8ED" strokeWidth="4.03422" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const getIcon = (iconType: 'networking' | 'insights' | 'experience') => {
  switch (iconType) {
    case 'networking':
      return <NetworkingIcon />;
    case 'insights':
      return <InsightsIcon />;
    case 'experience':
      return <ExperienceIcon />;
    default:
      return null;
  }
};

interface WhyAttendItem {
  title: string;
  description: string;
  icon: 'networking' | 'insights' | 'experience';
}

interface WhyAttendProps {
  items: WhyAttendItem[];
}

export const WhyAttend = ({ items }: WhyAttendProps) => {
  const { isMobile } = useMobile();

  return (
    <SectionWrapper $isMobile={isMobile}>
      <ConstrainedWrapper $isMobile={isMobile}>
        <ContentWrapper $isMobile={isMobile}>
          <HeaderWrapper>
            <Label>Why Attend?</Label>
            <Title $isMobile={isMobile}>An Evening Worth your Time</Title>
          </HeaderWrapper>

          <CardsGrid $isMobile={isMobile}>
            {items.map((item, index) => (
              <Card key={index} $isMobile={isMobile}>
                <IconWrapper>{getIcon(item.icon)}</IconWrapper>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            ))}
          </CardsGrid>
        </ContentWrapper>
      </ConstrainedWrapper>
    </SectionWrapper>
  );
};
