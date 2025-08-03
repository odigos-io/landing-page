'use client';

import React from 'react';
import Image from 'next/image';
import { TEAM } from '@/constants';
import { Button, Text } from '@/components';
import styled, { useTheme } from 'styled-components';
import { FlexColumn, FlexRow, hexOpacity } from '@/styles';

const Container = styled(FlexColumn)`
  align-self: stretch;
  justify-content: flex-start;
  gap: 16px;
  padding: 32px;
  max-width: 270px;
  width: calc(100% - 64px);
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.colors.grey + hexOpacity['050']};
  background-color: ${({ theme }) => theme.colors.grey_cold};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.grey + hexOpacity['050']};
`;

const PushDown = styled.div`
  margin-top: auto;
`;

export const TeamCard = ({ image, name, title, description, linkedin }: (typeof TEAM)[number]) => {
  const theme = useTheme();

  return (
    <Container>
      <FlexRow $gap={12}>
        <Image src={image} alt={title} width={64} height={64} style={{ borderRadius: '100%' }} />
        <FlexColumn $gap={8}>
          <Text fontSize={20} fontWeight={600}>
            {name}
          </Text>
          <Text fontSize={16}>{title}</Text>
        </FlexColumn>
      </FlexRow>

      <Divider />

      <Text fontSize={14} lineHeight='150%' letterSpacing='0.3px' color={theme.colors.off_white + hexOpacity['077']}>
        {description}
      </Text>

      <PushDown>
        <Button variant='transparent' leftIconSrc='/assets/linkedin-2.svg' href={linkedin} fontSize={16} iconSize={18} padding='0'>
          LINKEDIN
        </Button>
      </PushDown>
    </Container>
  );
};
