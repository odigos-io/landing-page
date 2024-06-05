import styled from 'styled-components';

export const FlexContainer = styled.div<{
  gap?: number;
  alignments?: string;
}>`
  display: flex;
  gap: ${({ gap }) => gap || 24}px;
  align-items: ${({ alignments }) => alignments || 'center'};

  @media (max-width: 600px) {
    gap: 16px;
  }
`;

export const ColumnContainer = styled.div<{
  gap?: number;
  alignments?: string;
  maxWidth?: number;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || 0}px;
  align-items: ${({ alignments }) => alignments || 'flex-start'};
  max-width: ${({ maxWidth }) => maxWidth || 600}px;
`;

export const SectionContainer = styled.div<{
  padding?: string;
  justify?: string;
}>`
  height: 100vh;
  padding: ${({ padding }) => padding || '80px 64px'};
  display: flex;
  justify-content: ${({ justify }) => justify || 'space-evenly'};
  @media (max-width: 1200px) {
    padding: ${({ padding }) => padding || '60px 48px'};
  }

  @media (max-width: 900px) {
    padding: ${({ padding }) => padding || '40px 32px'};
    flex-direction: column-reverse;
  }

  @media (max-width: 600px) {
    padding: ${({ padding }) => padding || '24px 20px'};
  }
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GridContainer = styled.div<{
  gap?: number;
  columns?: number;
}>`
  display: grid;
  gap: ${({ gap }) => gap || 64}px;
  grid-template-columns: repeat(${({ columns }) => columns || 3}, 1fr);

  @media (max-width: 600px) {
    gap: ${({ gap }) => gap || 24}px;
  }
`;

export const MainContainer = styled.main`
  background: ${({ theme }) => theme.colors.primary};
  padding-top: 100px;

  @media (max-width: 600px) {
    padding-top: 50px;
  }
`;
