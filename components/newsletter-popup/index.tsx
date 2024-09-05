import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NewsletterInput } from '../newsletter-input';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const PopupWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  border: 0.5px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  animation: ${(props) => (props.isVisible ? slideIn : slideOut)} 0.3s forwards;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const IconWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  border-radius: 32px;
  cursor: pointer;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

const NewsletterPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showIcon, setShowIcon] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setShowIcon(true), 300);
  };

  const handleIconClick = () => {
    setIsOpen(true);
    setShowIcon(false);
  };

  return (
    <>
      <PopupWrapper isVisible={isOpen}>
        <CloseButton onClick={handleClose}>
          <Image
            src="/icons/common/close.svg"
            width={24}
            height={24}
            alt="odigos"
          />
        </CloseButton>
        <NewsletterInput />
      </PopupWrapper>

      <IconWrapper isVisible={showIcon} onClick={handleIconClick}>
        <Image
          src="/icons/brand/black-icon.svg"
          width={30}
          height={30}
          alt="odigos"
        />
      </IconWrapper>
    </>
  );
};

export { NewsletterPopup };
