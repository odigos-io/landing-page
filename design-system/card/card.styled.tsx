import styled from 'styled-components';

interface CardContainerProps {
  selected?: any;
  type?: string;
}

export const CardContainer = styled.div<CardContainerProps>`
  display: inline-flex;
  position: relative;
  height: fit-content;
  flex-direction: column;
  border-radius: 24px;
  border: ${({ selected, type }) =>
    `1px solid ${
      selected ? '#0EE6F3' : type === 'primary' ? '#203548' : '#374a5b'
    }`};
  background: ${({ type }) => (type === 'primary' ? '#07111A' : '#0E1C28')};
  box-shadow: ${({ type }) =>
    type === 'primary'
      ? 'none'
      : '0px -6px 16px 0px rgba(0, 0, 0, 0.25),4px 4px 16px 0px rgba(71, 231, 241, 0.05),-4px 4px 16px 0px rgba(71, 231, 241, 0.05)'};
`;

export const CardHeader = styled(CardContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 24px 0px;
  box-shadow: none;
`;
