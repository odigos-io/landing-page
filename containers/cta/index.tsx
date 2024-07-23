'use client';
import React from 'react';
import theme from '@/style/theme';
import styled from 'styled-components';
import Github from '@/components/github';
import { Button, UnderlineText } from '@/reuseable-components';
import { MaxWidthContainer } from '@/style';
const PageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 160px 0;
  @media (max-width: 1024px) {
    padding: 120px 0;
  }
`;

const PageBorder = styled.div`
  display: flex;
  padding: 80px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 120px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  @media (max-width: 1450px) {
    padding: 0px 40px;
  }
  @media (max-width: 1024px) {
    padding: 0px;
    border: none;
  }
`;

const InnerBorder = styled.div`
  display: flex;
  padding: 0px 80px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px dashed rgba(249, 249, 249, 0.48);
  width: 100%;
  height: 100%;
  @media (max-width: 1450px) {
    padding: 0px 40px;
  }
  @media (max-width: 1024px) {
    padding: 16px;
    border-radius: 64px;
  }
`;

const SecondInnerBorder = styled(InnerBorder)`
  padding: 80px;
  @media (max-width: 1450px) {
    padding: 0px 40px;
  }
  @media (max-width: 1024px) {
    padding: 0 16px;
    border-radius: 48px;
  }
`;

const Body = styled.div`
  display: flex;
  padding: 80px 160px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
  border-radius: 64px;
  border: 1px solid #f9f9f9;
  @media (max-width: 1450px) {
    padding: 80px 120px;
  }
  @media (max-width: 1024px) {
    padding: 40px 20px 32px 20px;
    border-radius: 48px;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 105.6px */
  text-align: center;
  @media (max-width: 1440px) {
    font-size: 4vw;
  }
  @media (max-width: 1024px) {
    font-size: 32px;
    letter-spacing: 1px;
    line-height: 140%;
  }
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 30px;
  text-align: center;
  font-weight: 300;
  line-height: 133%;
  letter-spacing: -0.96px;
  opacity: 0.8;
  @media (max-width: 1440px) {
    font-size: 24px;
  }
  @media (max-width: 1024px) {
    font-size: 18px;
    letter-spacing: 1px;
    line-height: 155%;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: 1024px) {
    gap: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
`;

const CTA: React.FC = () => {
  const handleSignInClick = () => {
    window.open('https://app.odigos.io/signin', '_blank');
  };

  return (
    <MaxWidthContainer>
      <PageContainer>
        <PageBorder>
          <InnerBorder>
            <SecondInnerBorder>
              <Body>
                <TextWrapper>
                  <Title>
                    Unlock Full Visibility into Your Application Performance
                  </Title>
                  <Subtitle>
                    Enterprise-Grade OpenTelemetry for Superior Application
                    Performance Monitoring
                  </Subtitle>
                </TextWrapper>
                <ButtonWrapper>
                  <Button onClick={handleSignInClick} variant="secondary">
                    <UnderlineText color={theme.text.secondary}>
                      SIGN IN
                    </UnderlineText>
                  </Button>
                  <Button color={theme.colors.secondary}>
                    <Github />
                  </Button>
                </ButtonWrapper>
              </Body>
            </SecondInnerBorder>
          </InnerBorder>
        </PageBorder>
      </PageContainer>
    </MaxWidthContainer>
  );
};

export default CTA;
