'use client';
import React from 'react';
import theme from '@/style/theme';
import { DATA } from './data';
import styled from 'styled-components';
import { ColumnContainer, MaxWidthContainer, SectionContainer } from '@/style';
import {
  SectionTitle,
  Text,
  UnderlineText,
  LazyImage,
} from '@/reuseable-components';

const Container = styled(SectionContainer)`
  height: auto;
  padding: 120px 64px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 800px) {
    padding: 80px 20px;
  }
`;

const PageBody = styled(ColumnContainer)`
  max-width: fit-content;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 80px;
  margin-top: 40px;
  margin-bottom: 80px;
  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;

const PageTitle = styled.div`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 3vw;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  max-width: 50vw;
  @media (max-width: 800px) {
    font-size: 24px;
    max-width: 100%;
  }
`;

const TeamContainer = styled.div`
  column-count: 3; /* Number of columns */
  column-gap: 24px; /* Gap between columns */
  @media (max-width: 1200px) {
    column-count: 2;
  }
  @media (max-width: 800px) {
    column-count: 1;
  }
`;

const TeamItem = styled.div`
  display: inline-block;
  padding: 40px;
  width: 100%;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  margin-bottom: 32px; /* Space between items */
  break-inside: avoid;
  transition: border 0.3s ease;
  &:hover {
    border: 1px solid ${theme.colors.white};
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.32px;
  opacity: 0.8;

  b {
    font-weight: bold;
    opacity: 1;
  }
`;

const Divider = styled.div`
  border: 1px solid #f9f9f9;
  height: 1px;
  width: 100%;
  opacity: 0.4;
  background: #f9f9f9;
  margin: 16px 0;
`;

const TeamImage = styled.img`
  width: 100%;
  max-width: 40%;
  object-fit: cover;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);
  @media (max-width: 800px) {
    max-width: 100%;
  }
`;

const LinkWrapper = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  text-decoration: none;
`;

const Teams = () => {
  return (
    <MaxWidthContainer>
      <Container justify={'flex-start'} alignments={'flex-start'}>
        <PageBody>
          <SectionTitle
            headerInfo={{
              title: 'TEAM',
              subtitle: '',
              description: '',
            }}
          />
          <TitleWrapper>
            <PageTitle>
              The Odigos team is comprised of <b>OpenTelemetry</b> maintainers
              and developers who utilize <b>eBPF</b> to make implementing
              observability simple and instant.
            </PageTitle>
            <TeamImage alt="icon" src={'/images/team/team.jpg'} />
          </TitleWrapper>
          <TeamContainer>
            {DATA.map((data, index) => (
              <TeamItem key={index}>
                <TextWrapper>
                  <Text fontFam={theme.font_family.secondary} size={24}>
                    {data.name}
                  </Text>
                  <Title>{data.title}</Title>
                  <Divider />
                  <Title
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                  <LinkWrapper
                    href={data.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LazyImage
                      src={'/icons/social/linkedin.svg'}
                      alt="linkedin"
                      width={18}
                      height={18}
                      style={{ marginTop: 2 }}
                    />
                    <UnderlineText>LinkedIn</UnderlineText>
                  </LinkWrapper>
                </TextWrapper>
              </TeamItem>
            ))}
          </TeamContainer>
        </PageBody>
      </Container>
    </MaxWidthContainer>
  );
};

export default Teams;
