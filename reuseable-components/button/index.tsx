'use client';
import React, { ReactNode, ButtonHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  containerStyle?: React.CSSProperties;
}

const Wrapper = styled.div`
  border-radius: 48px;
  padding: 0.1rem;
  height: fit-content;
  width: fit-content;
  background: linear-gradient(
    317deg,
    rgb(249, 249, 249) 4%,
    rgb(66, 69, 159) 80%,
    rgb(66, 69, 159) 100%,
    rgb(249, 249, 249) 100%,
    rgb(66, 69, 159)
  );

  &:hover {
    background: linear-gradient(
      317deg,
      rgb(249, 249, 249) 4%,
      #ffb160 80%,
      #ffb160 100%,
      rgb(249, 249, 249) 100%,
      #ffb160
    );
  }
`;

const StyledButton = styled.button`
  border-radius: 48px;
  background: #151515;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.25) inset;
  color: white;
  display: flex;
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  &:hover {
    background: #1f1f1f;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  containerStyle = {},
  ...props
}) => {
  return (
    <Wrapper style={containerStyle}>
      <StyledButton onClick={onClick} type={type} {...props}>
        {children}
      </StyledButton>
    </Wrapper>
  );
};
