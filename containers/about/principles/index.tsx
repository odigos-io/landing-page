'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import { DATA } from './data';
import { ColumnContainer, GridContainer, SectionContainer } from '@/style';
import { SectionTitle, Text, LazyImage } from '@/reuseable-components';

const Container = styled(SectionContainer)`
  height: auto;
  padding: 160px 64px;
  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const PageBody = styled(ColumnContainer)`
  max-width: fit-content;
`;

const TitleWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
  @media (max-width: 800px) {
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
  @media (max-width: 800px) {
    font-size: 28px;
  }
`;

const PrinciplesContainer = styled(GridContainer)`
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const PrincipleItem = styled.div`
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  transition: border 0.3s ease;
  &:hover {
    border: 1px solid ${theme.colors.white};
  }
  @media (max-width: 800px) {
    gap: 32px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 800px) {
    gap: 12px;
  }
`;

const Description = styled.div`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.32px;
  opacity: 0.8;
`;

const Principles = () => {
  return (
    <Container
      justify={'flex-start'}
      alignments={'flex-start'}
      background={theme.colors.primary}
    >
      <PageBody>
        <SectionTitle
          headerInfo={{
            title: 'PRINCIPLES',
            subtitle: '',
            description: '',
          }}
        />
        <TitleWrapper>
          <PageTitle>Our Principles</PageTitle>
        </TitleWrapper>
        <PrinciplesContainer gap={24}>
          {DATA.map((data, index) => (
            <PrincipleItem key={index}>
              <LazyImage alt="icon" src={data.icon} width={64} height={64} />
              <TextWrapper>
                <Text fontFam={theme.font_family.secondary} size={24}>
                  {data.title}
                </Text>
                <Description>{data.description}</Description>
              </TextWrapper>
            </PrincipleItem>
          ))}
        </PrinciplesContainer>
      </PageBody>
    </Container>
  );
};

export default Principles;
