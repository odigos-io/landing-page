'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { QuickStartBtn, TrustedList, WatchDemoBtn } from '@/components';
import {
  FlexContainer,
  ColumnContainer,
  SectionContainer,
  MaxWidthContainer,
} from '@/style';
import { Button, LottieAnimation, UnderlineText } from '@/reuseable-components';
import animationData from '../../public/lotties/hero.json';
import useIsMobile from '@/hooks/useIsMobile';

const Modal = dynamic(() => import('@/reuseable-components/modal'));

const PageContainer = styled.div`
  padding-top: 100px;
  @media (max-width: 600px) {
    padding-top: 60px;
  }
`;

const LottieWrapper = styled.div`
  min-width: 33vw;
  @media (max-width: 1800px) {
    min-width: 37vw;
  }

  @media (max-width: 1300px) {
    width: 80%;
    margin-bottom: 32px;
    margin-top: 4px;
  }
  @media (max-width: 900px) {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    div {
      /* width: 80% !important; */
    }
  }
  @media (max-width: 650px) {
    height: 235px;
    div {
      width: 100% !important;
    }
  }
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 80px;
  font-weight: 400;
  line-height: 110%;
  letter-spacing: -1.92px;
  @media (max-width: 1050px) {
    font-size: 62px;
  }
  @media (max-width: 900px) {
    font-size: 48px;
  }
  @media (max-width: 650px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    letter-spacing: -1.12px;
  }
`;

const HeroSubTitle = styled.div`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 30px;
  font-weight: 300;
  line-height: 133%;
  opacity: 0.8;
  margin-top: 40px;

  @media (max-width: 1200px) {
    font-size: 24px;
    width: 80%;
  }
  @media (max-width: 750px) {
    font-size: 20px;
    width: 80%;
  }

  @media (max-width: 600px) {
    line-height: 155%;
    font-size: 20px;
    width: 100%;
  }
`;

const DemoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 300px;
  @media (max-width: 1200px) {
    height: 300px;
  }
`;

const Container = styled(SectionContainer)`
  align-items: flex-start;
  height: auto;
  @media (max-width: 900px) {
    flex-direction: row !important;
  }
  @media (max-width: 610px) {
    flex-direction: column-reverse !important;
  }
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 64px;
  width: 100%;
  @media (max-width: 700px) {
    gap: 16px;
    flex-direction: column-reverse;
  }
`;

const Hero = () => {
  const [open, setOpen] = React.useState(false);

  const isMobile = useIsMobile();

  return (
    <MaxWidthContainer>
      <PageContainer>
        <Container>
          <ColumnContainer>
            <FlexContainer gap={40}>
              <HeroTitle>Enterprise-Grade </HeroTitle>
            </FlexContainer>
            <HeroTitle>OpenTelemetry </HeroTitle>
            <HeroSubTitle>
              Accelerate OpenTelemetry implementation with Odigos, an eBPF-based
              solution providing zero-code, zero-performance overhead for deeper
              tracing
            </HeroSubTitle>
            <ActionButtonsWrapper>
              <WatchDemoBtn onClick={() => setOpen(true)} />
              <QuickStartBtn />
            </ActionButtonsWrapper>
            <TrustedList />
          </ColumnContainer>
          <LottieWrapper>
            <LottieAnimation
              animationData={animationData}
              loop={true}
              autoplay={true}
              height={isMobile ? 235 : '100%'}
            />
          </LottieWrapper>
        </Container>
        {open && (
          <Modal
            title="We are Odigos!"
            description=""
            onClose={() => setOpen(false)}
          >
            <DemoIframe
              className="rounded-lg demo-view"
              src={`https://www.youtube.com/embed/nynyV7FC4VI`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Modal>
        )}
      </PageContainer>
    </MaxWidthContainer>
  );
};

export default Hero;
