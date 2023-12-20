import styled from 'styled-components';

interface ButtonProps {
  variant?: string;
  disabled?: boolean;
}

export const ButtonContainer = styled.div<ButtonProps>`
  :hover {
    background: ${({ theme, disabled, variant }) =>
      disabled
        ? theme.colors.blue_grey
        : variant === 'primary'
        ? theme.colors.torquiz_light
        : 'transparent'};
  }
  p {
    cursor: ${({ disabled }) =>
      disabled ? 'not-allowed !important' : 'pointer !important'};
  }
`;

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  border-radius: 8px;
  border: none;
  width: 100%;
  height: 100%;
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'primary' ? 'transparent' : theme.colors.secondary};
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed !important' : 'pointer !important'};
  background: ${({ theme, disabled, variant }) =>
    disabled
      ? variant === 'primary'
        ? theme.colors.blue_grey
        : 'transparent'
      : variant === 'primary'
      ? theme.colors.secondary
      : 'transparent'};
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled, variant }) =>
    variant !== 'primary' && disabled ? 0.5 : 1};
`;
