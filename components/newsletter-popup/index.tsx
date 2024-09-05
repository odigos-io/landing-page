'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { NewsletterInput } from '../newsletter-input';

// Keyframe animations for sliding in and out
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

// Styled components for the popup and icon
const PopupWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  border: 0.5px dashed ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
  width: 600px;
  height: 170px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 48px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  animation: ${(props) => (props.isVisible ? slideIn : slideOut)} 0.3s forwards;

  @media (max-width: 700px) {
    width: 100%;
    height: 200px;
    bottom: 20px;
    right: 0px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
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
  const [isOpen, setIsOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date (yyyy-mm-dd)
    const lastSeen = localStorage.getItem('newsletterLastSeen');

    if (lastSeen !== today) {
      setIsOpen(true); // Show popup if it hasn't been seen today
    }
  }, []);

  const handleClose = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date (yyyy-mm-dd)
    localStorage.setItem('newsletterLastSeen', today); // Store the current date in localStorage
    setIsOpen(false);
    setTimeout(() => setShowIcon(true), 300); // Show the icon after the popup closes
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
        <NewsletterInput onConfirm={() => setTimeout(handleClose, 2000)} />
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
