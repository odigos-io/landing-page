import React from 'react';
import styled from 'styled-components';
import { Text } from '../text';
import Image from 'next/image';
import Link from 'next/link';
import { useAnnouncementStore } from '@/store/announcementStore';

interface AnnouncementBannerProps {
  title: string;
  link: string;
  linkText: string;
}

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444ad9;
  width: 100%;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
  padding: 16px 64px;

  @media (max-width: 1100px) {
    padding: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  padding-right: 4px;
`;

const Title = styled(Text)``;

const StyledLink = styled.span`
  display: flex;
  width: 89px;
  color: #f9f9f9;
  text-decoration: underline;
`;

const Divider = styled.div`
  width: 1.5px;
  height: 20px;
  opacity: 0.4;
  background: #f9f9f9;
  margin: 0 32px;
  @media (width < 600px) {
    opacity: 0;
    margin: 0 8px;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  title,
  link,
  linkText,
}) => {
  const { isOpen, closeBanner } = useAnnouncementStore();

  if (!isOpen || !title) {
    return null;
  }

  return (
    <Banner>
      <Content>
        <Image
          alt="frame"
          src={'/icons/common/frame.svg'}
          width={24}
          height={24}
          style={{ marginRight: 12 }}
        />
        <Title>{title}</Title>
      </Content>
      <Link href={link}>
        <LinksWrapper>
          <StyledLink>{linkText}</StyledLink>
          <Divider />
        </LinksWrapper>
      </Link>

      <Image
        onClick={closeBanner}
        alt="frame"
        src={'/icons/common/close.svg'}
        width={15}
        height={12}
      />
    </Banner>
  );
};

export { AnnouncementBanner };
