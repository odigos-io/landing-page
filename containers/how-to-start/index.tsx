'use client';
import React from 'react';
import { DATA } from './data';
import theme from '@/style/theme';
import styled from 'styled-components';
import { ColumnContainer, FlexContainer, SectionContainer } from '@/style';
import {
  LottieAnimation,
  SectionTitle,
  LazyImage,
} from '@/reuseable-components';

const Container = styled(SectionContainer)`
  height: auto;
  padding: 120px 64px;
  width: 100%;
  @media (max-width: 1100px) {
    padding: 80px 64px;
  }
  @media (max-width: 800px) {
    padding: 80px 32px;
  }
`;

const PageBody = styled(ColumnContainer)`
  max-width: 100%;
  width: 100%;
`;

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1100px) {
    margin-bottom: 64px;
  }
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.h2`
  margin-bottom: 40px;
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  line-height: 150%;
  opacity: 0.8;
  @media (max-width: 1100px) {
    margin-bottom: 0px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1100px) {
    gap: 80px;
    flex-direction: column;
    justify-content: center;
  }
`;

const ItemTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
  text-transform: uppercase;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const ItemSubtitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  letter-spacing: 0.32px;
  opacity: 0.8;
  @media (max-width: 1100px) {
    max-width: 422px;
  }
`;

const ArrowIconWrapper = styled.div`
  display: flex;
  width: 10vw;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const ItemWrapper = styled(ColumnContainer)`
  @media (max-width: 1100px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 100%;
    gap: 48px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const TextWrapper = styled(ColumnContainer)`
  @media (max-width: 1100px) {
    justify-content: center;
  }
`;

const HowToStart: React.FC = () => {
  return (
    <Container
      padding="0"
      justify={'flex-start'}
      alignments={'flex-start'}
      background={theme.colors.secondary}
    >
      <PageBody>
        <SectionTitle
          headerInfo={{
            title: 'HOW TO START',
            subtitle: '',
            description: '',
          }}
        />
        <TitleWrapper>
          <PageTitle>Implementation in 3 easy step</PageTitle>
          <Subtitle>
            Odigos uses OpenTelemetry and eBPF to build agnostic observability
            pipelines for all applications.
          </Subtitle>
        </TitleWrapper>
        <ListContainer>
          {DATA.map((item, index) => (
            <>
              <ItemWrapper key={index} gap={32}>
                <div>
                  <LottieAnimation
                    animationData={item.lottie}
                    loop={true}
                    autoplay={true}
                    width={320}
                  />
                </div>
                <FlexContainer alignments={'flex-start'}>
                  <TextWrapper gap={16}>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemSubtitle>{item.subtitle}</ItemSubtitle>
                  </TextWrapper>
                  {index !== 2 && (
                    <ArrowIconWrapper>
                      <LazyImage
                        src="/icons/common/arrow.svg"
                        width={27}
                        height={40}
                        alt="arrow"
                      />
                    </ArrowIconWrapper>
                  )}
                </FlexContainer>
              </ItemWrapper>
            </>
          ))}
        </ListContainer>
      </PageBody>
    </Container>
  );
};

export default HowToStart;
