'use client';
import React from 'react';
import { DATA } from './data';
import Image from 'next/image';
import theme from '@/style/theme';
import styled from 'styled-components';
import { SectionTitle } from '@/reuseable-components';
import { ColumnContainer, FlexContainer, SectionContainer } from '@/style';

const Container = styled(SectionContainer)`
  height: auto;
  padding: 120px 64px;
  width: 100%;
  @media (max-width: 1100px) {
    padding: 80px 20px;
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
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 56px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media (max-width: 1100px) {
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
    font-size: 16px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1100px) {
    gap: 40px;
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

const StepIllustration = styled.img`
  @media (max-width: 1100px) {
    width: 100%;
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
              <ColumnContainer key={index} gap={32}>
                <StepIllustration src={item.image} alt={item.title} />
                <FlexContainer alignments={'flex-start'}>
                  <ColumnContainer gap={16} maxWidth={320}>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemSubtitle>{item.subtitle}</ItemSubtitle>
                  </ColumnContainer>
                  {index !== 2 && (
                    <ArrowIconWrapper>
                      <Image
                        src="/icons/common/arrow.svg"
                        width={27}
                        height={40}
                        alt="arrow"
                      />
                    </ArrowIconWrapper>
                  )}
                </FlexContainer>
              </ColumnContainer>
            </>
          ))}
        </ListContainer>
      </PageBody>
    </Container>
  );
};

export default HowToStart;
