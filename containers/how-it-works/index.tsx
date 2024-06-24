'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import { SectionTitle } from '@/reuseable-components';
import { HowItWorksTexts } from './how-it-works-texts';
import HowItWorksIllustrations from './how-it-works-illustrations';
import useIsMobile from '@/hooks/useIsMobile';
import HowItWorksIllustrationsMobile from './how-it-works-illustrations-mobile';
import { HowItWorksTextsMobile } from './how-it-works-texts-mobile';

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 120px;
  @media (max-width: 850px) {
    margin-bottom: 380px;
  }
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media (max-width: 800px) {
    font-size: 28px;
  }
`;

const Container = styled.div`
  padding: 160px 64px;

  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MobileBody = styled.div`
  position: relative;
  height: 2864px;
  width: 350px;
`;

const HowItWorks = () => {
  const isMobile = useIsMobile(1250);
  function renderDesktop() {
    return (
      <Body>
        <HowItWorksTexts />
        <HowItWorksIllustrations />
      </Body>
    );
  }

  function renderMobile() {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <MobileBody>
          <HowItWorksTextsMobile />
          <HowItWorksIllustrationsMobile />
        </MobileBody>
      </div>
    );
  }

  return (
    <Container style={{ background: theme.colors.primary }}>
      <SectionTitle
        headerInfo={{
          title: 'HOW IT WORKS',
          subtitle: '',
          description: '',
        }}
      />
      <TitleWrapper>
        <PageTitle>Observability made easy</PageTitle>
      </TitleWrapper>
      {isMobile ? renderMobile() : renderDesktop()}
    </Container>
  );
};

export default HowItWorks;
