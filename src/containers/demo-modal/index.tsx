'use client';

import React, { CSSProperties, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMobile } from '@/contexts';
import { DEMO_VIDEO_LINK } from '@/constants';
import styled, { useTheme } from 'styled-components';
import { Modal, SlackInviteButton, Text } from '@/components';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoWrapper = styled.div<{
  $width: CSSProperties['width'];
  $height: CSSProperties['height'];
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.black_lighter};
  background: ${({ theme }) => `linear-gradient(90deg, ${theme.colors.cyan} 0.48%, ${theme.colors.purple} 47.12%, ${theme.colors.pink} 100%)`};
  overflow: hidden;
`;

const Video = styled.video<{ $isLoaded: boolean }>`
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
`;

const BottomWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'unset' : 'center')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'space-between')};
  gap: 12px;
`;

const ASPECT_RATIO = 1114 / 720;
const QUERY_KEY = 'demo';

export const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useMobile();
  const searchParams = useSearchParams();
  const isDemoOpenViaQuery = searchParams.get(QUERY_KEY) != null; // do not strict compare (!==) because we need to check for null and undefined

  const videoWidth = isMobile ? '100%' : 800;
  const videoHeight = isMobile ? 'unset' : `${800 / ASPECT_RATIO}px`;

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const removeDemoQueryParam = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(QUERY_KEY);

    const newUrl = newSearchParams.toString() ? `${pathname}?${newSearchParams.toString()}` : pathname;

    router.replace(newUrl);
  };

  return (
    <Modal
      isOpen={isOpen || isDemoOpenViaQuery}
      onClose={() => {
        if (isDemoOpenViaQuery) removeDemoQueryParam();
        onClose();
      }}
      title='We are Odigos!'
    >
      <VideoWrapper $width={videoWidth} $height={videoHeight}>
        <Video src={DEMO_VIDEO_LINK} width={videoWidth} height={videoHeight} controls onLoadedData={() => setIsVideoLoaded(true)} $isLoaded={isVideoLoaded} />
      </VideoWrapper>

      <BottomWrapper $isMobile={isMobile}>
        <Text color={theme.colors.grey}>Join our slack community to get the latest updates and ask questions</Text>

        <SlackInviteButton variant='primary' fullWidth={isMobile} />
      </BottomWrapper>
    </Modal>
  );
};
