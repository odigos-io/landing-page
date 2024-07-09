'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { TrustedList, WatchDemoBtn } from '@/components';
import {
  FlexContainer,
  ColumnContainer,
  SectionContainer,
  MaxWidthContainer,
} from '@/style';
import { LottieAnimation } from '@/reuseable-components';
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
  width: 36%;
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
      width: 60% !important;
    }
  }
  @media (max-width: 650px) {
    div {
      width: 100% !important;
    }
  }
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: clamp(3.5rem, 6vw, 6rem);
  font-weight: 400;
  line-height: 110%;
  letter-spacing: -1.92px;
  @media (max-width: 600px) {
    letter-spacing: -1.12px;
  }
`;

const HeroSubTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: clamp(1.1rem, 3vw, 1.875rem);
  font-weight: 200;
  line-height: 133%;
  opacity: 0.8;
  margin-top: 40px;

  @media (max-width: 600px) {
    line-height: 155%;
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
  @media (max-width: 1300px) {
    height: auto;
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
              <HeroTitle>Deeper</HeroTitle>

              <WatchDemoBtn onClick={() => setOpen(true)} />
            </FlexContainer>
            <HeroTitle>Observability </HeroTitle>
            <HeroSubTitle>
              Resolve incidents faster with deeper distributed tracing for all
              your backend architecture without any code changes.
            </HeroSubTitle>
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
