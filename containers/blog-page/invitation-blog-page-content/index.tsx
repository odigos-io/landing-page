'use client';
import styled from 'styled-components';
import { MaxWidthContainer } from '@/style';
import { MarkdownToHtml } from '@/components';
import HubSpotForm from '@/components/forms/HubSpotForm';

type Props = {
  post: any;
};

const BlogPageContentContainer = styled.div`
  padding: 120px 64px 80px 64px;
  display: flex;
  width: 100%;
  max-width: 1440px;
  gap: 64px;
  @media (width < 1400px) {
    padding: 40px 40px 120px 40px;
    gap: 48px;
  }
  @media (width < 1000px) {
    flex-direction: column;
    padding: 40px 20px 120px 20px;
    gap: 48px;
  }
`;

const EventPageContent = ({ post }: Props) => {
  return (
    <MaxWidthContainer style={{ flexDirection: 'column' }}>
      <BlogPageContentContainer>
        <MarkdownToHtml source={post.content} />
        <HubSpotForm isKubeCon isHappyHour={false} />
      </BlogPageContentContainer>
    </MaxWidthContainer>
  );
};

export default EventPageContent;
