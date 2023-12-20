import { styled } from 'styled-components';

interface ActiveProps {
  active?: any;
  error: boolean | undefined;
}

export const StyledInputContainer = styled.div<ActiveProps>`
  position: relative;
  display: flex;
  width: 100%;
  padding-left: 13px;
  height: 100%;
  min-height: 42px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  border: ${({ error, active }) =>
    `1px solid ${error ? '#FD3F3F' : active ? '#8b92a5' : '#374A5B'}`};

  &:hover {
    border: solid 1px #8b92a5;
  }
`;

export const StyledInput = styled.input`
  background: #1b2136;
  border: none;
  outline: none;
  width: 100%;
  color: #fff;
`;

export const StyledActionInput = styled(StyledInput)`
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 24px;
`;

export const LabelWrapper = styled.div`
  margin-bottom: 8px;
  text-align: start;
`;

export const ErrorWrapper = styled.div`
  margin-top: 4px;
`;

export const DisplayIconsWrapper = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;
