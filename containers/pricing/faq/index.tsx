'use client';
import React, { useState } from 'react';
import { DATA } from './data';
import theme from '@/style/theme';
import styled from 'styled-components';
import useIsMobile from '@/hooks/useIsMobile';
import { SectionTitle, LazyImage } from '@/reuseable-components';
import {
  ColumnContainer,
  SectionContainer,
  IconWrapper as OriginalIconWrapper,
  MaxWidthContainer,
} from '@/style';
import { BlurFade } from '@/components';

const Container = styled(SectionContainer)`
  height: auto;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
  padding: 160px 64px 0px 64px;
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

const FAQContainer = styled.div`
  width: 100%;
`;

const FAQItem = styled.div`
  border-top: 1px solid rgba(249, 249, 249, 0.64);
  padding: 40px 0;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:first-child {
    border-top: none;
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
  font-family: ${({ theme }) => theme.font_family.primary};
  color: ${theme.text.primary};
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;

const Answer = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-family: ${({ theme }) => theme.font_family.primary};
  color: ${theme.text.primary};
  opacity: 0.8;
  line-height: 160%;
  @media (max-width: 800px) {
    font-size: 16px;
  }
`;

const ExpandIcon = styled(OriginalIconWrapper)`
  display: flex;
  background-color: ${theme.colors.secondary};
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    width: 32px;
    height: 32px;
  }
`;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const isMobile = useIsMobile();

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <MaxWidthContainer>
      <Container justify={'flex-start'} alignments={'flex-start'}>
        <PageBody>
          <SectionTitle
            headerInfo={{
              title: 'FAQs',
              subtitle: '',
              description: '',
            }}
          />
          <TitleWrapper>
            <PageTitle>Your Questions, Answered</PageTitle>
          </TitleWrapper>
          <FAQContainer>
            {DATA.map((item, index) => (
              <FAQItem key={item.id} onClick={() => handleToggle(index)}>
                <Question>
                  {item.quest}

                  <div>
                    <ExpandIcon>
                      <LazyImage
                        src={'/icons/common/expand.svg'}
                        alt={'expand'}
                        width={isMobile ? 16 : 24}
                        height={isMobile ? 16 : 24}
                        style={{
                          transition: 'transform 0.3s ease',
                          transform:
                            activeIndex === index
                              ? 'rotate(0deg)'
                              : 'rotate(180deg)',
                        }}
                      />
                    </ExpandIcon>
                  </div>
                </Question>
                {activeIndex === index && (
                  <BlurFade>
                    <Answer>{item.ans}</Answer>
                  </BlurFade>
                )}
              </FAQItem>
            ))}
          </FAQContainer>
        </PageBody>
      </Container>
    </MaxWidthContainer>
  );
};

export default FAQ;
