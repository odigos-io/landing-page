'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FAQ } from '@/constants';
import { Text } from '@/components';
import { useMobile } from '@/contexts';
import styled, { useTheme } from 'styled-components';
import { FlexColumn, FlexRow, hexOpacity } from '@/styles';

const Container = styled(FlexRow)<{ $isMobile: boolean }>`
  justify-content: space-between;
  gap: 12px;
  width: calc(100% - ${({ $isMobile }) => ($isMobile ? '32px' : '64px')});
  padding: ${({ $isMobile }) => ($isMobile ? '24px' : '32px')};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.grey_darkest};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey_darker};
  }
`;

const ContainTexts = styled(FlexColumn)<{
  $isOpen: boolean;
  $titleHeight: number;
  $descriptionHeight: number;
}>`
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  height: ${({ $isOpen, $titleHeight, $descriptionHeight }) => ($isOpen ? `${$titleHeight + $descriptionHeight + 24}px` : `${$titleHeight}px`)};
  overflow: hidden;
`;

const ExtendButton = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 48px;
  border: 1px solid ${({ theme }) => theme.colors.off_white};
`;

const RotatingImage = styled(Image)<{ $isOpen: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: rotate(${({ $isOpen }) => ($isOpen ? '-90deg' : '90deg')});
`;

export const FaqCard = ({ title, description }: (typeof FAQ)[number]) => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const titleRef = useRef<HTMLParagraphElement>(null);
  const [titleHeight, setTitleHeight] = useState(0);

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  useEffect(() => {
    const t = titleRef.current?.clientHeight || 0;
    const d = descriptionRef.current?.clientHeight || 0;

    setTitleHeight(t);
    setDescriptionHeight(d);
  }, []);

  const iconSize = isMobile ? 12 : 24;

  return (
    <Container $isMobile={isMobile} onClick={toggleOpen}>
      <ContainTexts $isOpen={isOpen} $titleHeight={titleHeight} $descriptionHeight={descriptionHeight}>
        <Text ref={titleRef} fontSize={isMobile ? '18px' : '28px'}>
          {title}
        </Text>
        <Text ref={descriptionRef} fontSize={isMobile ? '16px' : '18px'} color={theme.colors.off_white + hexOpacity['080']} lineHeight='160%'>
          {description}
        </Text>
      </ContainTexts>

      <ExtendButton>
        <RotatingImage $isOpen={isOpen} src='/assets/icons/arrow.svg' alt='arrow' width={iconSize} height={iconSize} />
      </ExtendButton>
    </Container>
  );
};
