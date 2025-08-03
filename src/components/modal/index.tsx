'use client';

import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { Text } from '../text';
import { Button } from '../button';
import { useMobile } from '@/contexts';
import { useOnClickOutside } from '@/hooks';
import styled, { css } from 'styled-components';
import { FlexColumn, FlexRow, hexOpacity } from '@/styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black + hexOpacity['080']};
`;

const ModalContainer = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.black_lighter};
  border-radius: 32px;
  max-height: 85vh;
  max-width: 85vw;
  overflow-y: auto;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 100%;
        `
      : css`
          min-width: 800px;
        `}
`;

const ModalHeader = styled.div<{ $isMobile: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
`;

const ModalContent = styled(FlexColumn)<{ $isMobile: boolean }>`
  gap: 24px;
  width: calc(100% - ${({ $isMobile }) => ($isMobile ? '32px' : '104px')});
  padding: ${({ $isMobile }) => ($isMobile ? '0 16px 24px 16px' : '0 52px 52px 52px')};
`;

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { isMobile } = useMobile();

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay>
      <ModalContainer ref={modalRef} $isMobile={isMobile}>
        <ModalHeader $isMobile={isMobile}>
          <Button onClick={onClose} variant='transparent' rightIconSrc='/assets/icons/close.svg' iconSize={isMobile ? 24 : 42} padding='4px' />
        </ModalHeader>

        <ModalContent $isMobile={isMobile}>
          {title && (
            <FlexRow $gap={isMobile ? 12 : 24} $align='center'>
              <Image src='/assets/odigos/logo_white.svg' alt='logo' width={isMobile ? 28 : 42} height={isMobile ? 28 : 42} />
              <Text fontSize={isMobile ? 32 : 40} fontWeight={600} noWrap>
                {title}
              </Text>
            </FlexRow>
          )}

          {children}
        </ModalContent>
      </ModalContainer>
    </Overlay>,
    document.body,
  );
};
