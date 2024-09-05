'use client';
import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  containerStyle?: React.CSSProperties;
  variant?: 'primary' | 'secondary';
}

const gradientAnimationShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const gradientAnimationHide = keyframes`
  from {
    opacity: 1;
    border: 1px solid transparent;
  }
  to {
    opacity: 0;
    border: 1px solid transparent;

  }
`;

const Wrapper = styled.div<{
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  show?: boolean;
}>`
  position: relative;
  border-radius: 48px;
  padding: ${({ variant }) => (variant === 'primary' ? '0.1rem;' : '0')};
  height: fit-content;
  width: 100%;
  opacity: 1;
  background: ${({ disabled, show }) =>
    disabled
      ? 'none'
      : show
      ? 'transparent'
      : 'linear-gradient(317deg, rgb(249, 249, 249) 4%, rgb(66, 69, 159) 80%, rgb(66, 69, 159) 100%, rgb(249, 249, 249) 100%, rgb(66, 69, 159))'};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary';
  color?: string;
  disabled?: boolean;
}>`
  position: relative;
  border-radius: 48px;
  background: ${({ variant, theme, color }) =>
    variant === 'primary'
      ? color
        ? color
        : theme.colors.primary
      : color
      ? color
      : theme.colors.white};
  /* box-shadow: ${({ variant }) =>
    variant === 'primary' ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'}; */
  display: flex;
  width: 100%;
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  /* gap: 8px; */
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const LinearGradientBackground = styled.div<{
  show: boolean;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0;
  border-radius: 48px;
  width: 100%;
  height: 100%;
  ${({ show }) =>
    show
      ? css`
          background: linear-gradient(
            317deg,
            rgb(249, 249, 249) 4%,
            rgb(66, 69, 159) 80%,
            rgb(66, 69, 159) 100%,
            rgb(249, 249, 249) 100%,
            rgb(66, 69, 159)
          );
          animation: ${gradientAnimationShow} 0.5s forwards;
        `
      : css`
          animation: ${gradientAnimationHide} 0.3s forwards;
        `};
`;

const PrimaryHoverBackground = styled.div<{
  show: boolean;
}>`
  gap: 8px;
  border: 1px solid #f9f9f9;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 48px;
  width: 100%;
  height: 100%;
  background: rgba(68, 74, 217, 0.12);
  ${({ show }) =>
    show
      ? css`
          animation: ${gradientAnimationShow} 0.5s forwards;
        `
      : css`
          animation: ${gradientAnimationHide} 0.5s forwards;
        `};
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  containerStyle = {},

  ...props
}) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Wrapper
      disabled={disabled}
      variant={variant}
      style={containerStyle}
      show={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <StyledButton
        disabled={disabled}
        variant={variant}
        onClick={onClick}
        type={type}
        {...props}
      >
        {variant === 'secondary' && (
          <LinearGradientBackground show={hover}>
            {children}
          </LinearGradientBackground>
        )}
        {variant === 'primary' && hover && (
          <PrimaryHoverBackground show={hover}>
            {children}
          </PrimaryHoverBackground>
        )}
        {children}
      </StyledButton>
    </Wrapper>
  );
};
