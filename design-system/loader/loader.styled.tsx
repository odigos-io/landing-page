import styled from 'styled-components';

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const StyledLoader = styled.div<{
  width?: number | undefined;
  height?: number | undefined;
}>`
  width: ${({ width }) => width || 48}px;
  height: ${({ height }) => height || 48}px;
  border: 4px solid;
  border-color: ${({ theme }) =>
    `${theme.colors.secondary} ${theme.colors.secondary} ${theme.colors.secondary}  transparent`};
  border-radius: 50%;
  animation: spin-anim 1.2s linear infinite;

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
