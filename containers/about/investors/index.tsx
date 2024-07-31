'use client';
import React from 'react';
import { DATA } from './data';
import theme from '@/style/theme';
import styled from 'styled-components';
import { SectionTitle } from '@/reuseable-components';
import { ColumnContainer, MaxWidthContainer, SectionContainer } from '@/style';

const Container = styled(SectionContainer)`
  height: auto;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;

  padding: 0px 64px 120px 64px;
  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  opacity: 0.4;
  background: #f5f5f5;
  margin-bottom: 120px;
`;

const PageBody = styled(ColumnContainer)`
  width: 100%;
  max-width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
  margin-bottom: 80px;
  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 40px;
  line-height: 150%;
  max-width: 40vw;
  @media (max-width: 800px) {
    font-size: 24px;
    max-width: 100%;
  }
`;

const PageDescription = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 20px;
  line-height: 150%;
  font-weight: 300;
  max-width: 60vw;
  opacity: 0.8;
  @media (max-width: 800px) {
    font-size: 14px;
    max-width: 100%;
  }
`;

const InvestorsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(564px, 1fr));
  gap: 120px;

  @media (max-width: 1385px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(auto-fill, minmax(355px, 1fr));
  }
`;

const InvestorItem = styled.div`
  display: flex;
  gap: 32px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  @media (max-width: 650px) {
    width: 70%;
  }
`;

const Title = styled.div`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 133%;
  text-transform: uppercase;
  @media (max-width: 650px) {
    font-size: 20px;
  }
`;

const Description = styled.div`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  @media (max-width: 650px) {
    font-size: 14px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  width: 200px;
  height: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  background: #242023;

  @media (max-width: 650px) {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }
`;

const InvestorImage = styled.img`
  /* height: 56px; */
  /* object-fit: cover; */
  @media (max-width: 650px) {
    height: 32px;
  }
`;

const Investors = () => {
  return (
    <MaxWidthContainer>
      <Container justify={'flex-start'} alignments={'flex-start'}>
        <Divider />
        <PageBody>
          <SectionTitle
            headerInfo={{
              title: 'INVESTORS',
              subtitle: '',
              description: '',
            }}
          />
          <TitleWrapper>
            <PageTitle>Backing Our Vision</PageTitle>
            <PageDescription>
              Explore the investors who believe in our potential and are helping
              us achieve our goals through strategic support and funding.
            </PageDescription>
          </TitleWrapper>
          <InvestorsContainer>
            {DATA.map((item, index) => (
              <InvestorItem key={index}>
                <ImageWrapper>
                  <InvestorImage src={item.logo} alt={item.name} />
                </ImageWrapper>
                <TextWrapper>
                  <Title>{item.name}</Title>
                  <Description>{item.description}</Description>
                </TextWrapper>
              </InvestorItem>
            ))}
          </InvestorsContainer>
        </PageBody>
      </Container>
    </MaxWidthContainer>
  );
};

export default Investors;
