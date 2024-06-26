import React from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { ColumnContainer } from '@/style';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

type ModalProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  onClose: () => void;
};

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const ModalContainer = styled.div<{ isVisible: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(21, 21, 21, 0.8);
  position: fixed;
  z-index: 9999;
  top: 0;
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.3s ease-out;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`;

const DashedLayer = styled.div<{
  padding?: string;
}>`
  border-radius: 80px;
  border: 1px dashed rgba(249, 249, 249, 0.4);
  background: ${({ theme }) => theme.text.secondary};
  padding: ${({ padding }) => padding || '0 64px'};
  height: 90%;
  width: 70%;

  @media (max-width: 1300px) {
    border: 1px dashed rgba(249, 249, 249, 0);
    padding: 0 16px;
    height: fit-content;
    width: 100%;
    border-radius: 48px;
  }
`;

const InnerDashedLayer = styled(DashedLayer)`
  height: 100%;
  width: 100%;
  @media (max-width: 1300px) {
    border: 1px dashed rgba(249, 249, 249, 0.4);
  }
`;

const ModalBody = styled.div`
  display: flex;
  padding: 80px 96px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 80px;
  border: 1px solid ${({ theme }) => theme.text.primary};
  background: ${({ theme }) => theme.text.secondary};
  height: 100%;
  @media (max-width: 1300px) {
    padding: 20px 32px;
    border-radius: 48px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: clamp(1.8rem, 6vw, 3.5rem);
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  @media (max-width: 1300px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  opacity: 0.8;

  @media (max-width: 1300px) {
    font-size: 16px;
  }
`;

const CloseIconWrapper = styled.div`
  @media (max-width: 1300px) {
    width: 32px;
    height: 32px;
  }
`;

const Modal = ({ title, description, onClose, children }: ModalProps) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const containerRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => handleClose());

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Match the duration of the fade-out animation
  };

  return (
    <ModalContainer isVisible={isVisible}>
      <DashedLayer ref={containerRef}>
        <InnerDashedLayer>
          <ModalBody>
            <ModalHeader>
              {title && (
                <ColumnContainer gap={32}>
                  <Title>{title}</Title>
                  {description && <Description>{description}</Description>}
                </ColumnContainer>
              )}
              <div>
                <CloseIconWrapper onClick={handleClose}>
                  <Image
                    width={16}
                    height={16}
                    src="icons/common/close.svg"
                    alt="close"
                  />
                </CloseIconWrapper>
              </div>
            </ModalHeader>
            {children}
          </ModalBody>
        </InnerDashedLayer>
      </DashedLayer>
    </ModalContainer>
  );
};

export default Modal;
