'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import { DATA } from './data';
import { ColumnContainer, GridContainer, SectionContainer } from '@/style';
import { SectionTitle, Text, UnderlineText } from '@/reuseable-components';
import Image from 'next/image';

const Container = styled(SectionContainer)`
  height: auto;
  padding: 160px 64px;
  @media (max-width: 800px) {
    padding: 80px 20px;
  }
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
  max-width: 50vw;
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
  gap: 32px;
  justify-content: center;
`;

const TeamItem = styled.div`
  display: flex;
  gap: 32px;
  min-width: 564px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 133%;
  text-transform: uppercase;
`;

const ImageWrapper = styled.div`
  display: flex;
  min-width: 200px;
  height: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 80px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  background: #242023;
`;

const InvestorImage = styled.img`
  height: 56px;
  object-fit: cover;
`;

const Investors = () => {
  return (
    <Container
      justify={'flex-start'}
      alignments={'flex-start'}
      background={theme.colors.secondary}
    >
      <PageBody>
        <SectionTitle
          headerInfo={{
            title: 'INVESTORS',
            subtitle: '',
            description: '',
          }}
        />
        <TitleWrapper>
          <PageTitle>This is a headline</PageTitle>
          <PageDescription>
            This is a short description of the section which the name you can
            see above.
          </PageDescription>
        </TitleWrapper>
        <InvestorsContainer>
          {DATA.map((item, index) => (
            <TeamItem key={index}>
              <ImageWrapper>
                <InvestorImage src={item.logo} alt={item.name} />
              </ImageWrapper>
              <TextWrapper>
                <Title>{item.name}</Title>
                <Text size={16} weight={300} color="rgba(249, 249, 249, 0.80)">
                  {item.description}
                </Text>
              </TextWrapper>
            </TeamItem>
          ))}
        </InvestorsContainer>
      </PageBody>
    </Container>
  );
};

export default Investors;
