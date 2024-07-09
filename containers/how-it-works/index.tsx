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
import { HowItWorksTextsMedium } from './how-it-works-texts-medium';
import HowItWorksIllustrationsMedium from './how-it-works-illustrations-medium';
import { MaxWidthContainer } from '@/style';

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 120px;

  @media (max-width: 800px) {
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

  @media (max-width: 1250px) {
    font-size: 28px;
  }
`;

const Container = styled.div`
  padding: 160px 64px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1250px) {
    align-items: center;
  }
  @media (max-width: 650px) {
    align-items: flex-start;
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

const MediumBody = styled.div`
  position: relative;
  width: 660px;
  height: 5832px;
`;

const HowItWorks = () => {
  const isMobile = useIsMobile(800);
  const isMedium = useIsMobile(1250);
  function renderDesktop() {
    return (
      <Body>
        <HowItWorksTexts />
        <HowItWorksIllustrations />
      </Body>
    );
  }

  function renderMediumScreen() {
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
        <MediumBody>
          <HowItWorksTextsMedium />
          <HowItWorksIllustrationsMedium />
        </MediumBody>
      </div>
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

  function renderBody() {
    if (isMobile) {
      return renderMobile();
    } else if (isMedium) {
      return renderMediumScreen();
    } else {
      return renderDesktop();
    }
  }

  return (
    <MaxWidthContainer style={{ background: theme.colors.primary }}>
      <Container>
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
        {renderBody()}
      </Container>
    </MaxWidthContainer>
  );
};

export default HowItWorks;
