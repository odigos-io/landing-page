'use client';

import React from 'react';
import Image from 'next/image';
import { useMobile } from '@/contexts';
import { FlexColumn } from '@/styles';
import { Text } from '@/components';
import type { WebinarSpeaker } from '@/types';
import styled, { useTheme } from 'styled-components';

interface WebinarSpeakersProps {
  speakers: WebinarSpeaker[];
}

const SpeakersGrid = styled.div<{ $isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isMobile }) => ($isMobile ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))')};
  gap: 24px;
`;

const SpeakerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 16px;
  background: ${({ theme }) => theme.colors.grey_cold};
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
  border-radius: 16px;
  text-align: center;
`;

const AvatarWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grey_darker};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Initials = styled.span`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`;

export const WebinarSpeakers = ({ speakers }: WebinarSpeakersProps) => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  if (!speakers || speakers.length === 0) return null;

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <FlexColumn $gap={24}>
      <Text fontSize={isMobile ? 18 : 22} fontWeight={600} lineHeight='130%'>
        Featured Speakers
      </Text>

      <SpeakersGrid $isMobile={isMobile}>
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name}>
            <AvatarWrapper>
              {speaker.image ? (
                <Image src={speaker.image} alt={speaker.name} width={80} height={80} style={{ objectFit: 'cover' }} />
              ) : (
                <Initials>{getInitials(speaker.name)}</Initials>
              )}
            </AvatarWrapper>

            <FlexColumn $gap={4} style={{ alignItems: 'center' }}>
              <Text fontSize={16} fontWeight={600}>
                {speaker.name}
              </Text>
              <Text fontSize={14} color={theme.colors.grey_lighter}>
                {speaker.title}
              </Text>
              {speaker.company && (
                <Text fontSize={13} color={theme.colors.grey_lighter}>
                  {speaker.company}
                </Text>
              )}
            </FlexColumn>
          </SpeakerCard>
        ))}
      </SpeakersGrid>
    </FlexColumn>
  );
};
