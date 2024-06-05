import React from 'react';
import styled, { keyframes } from 'styled-components';
const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #F9F9F9 }
`;

const TypewriterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TypewriterText = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 3.5em;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid #f9f9f9; /* The typewriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto;
  letter-spacing: 0.15em; /* Adjust as needed */
  animation: ${typing} 3.5s steps(30, end), ${blinkCaret} 0.5s step-end infinite;
`;

interface TypewriterProps {
  text: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  return (
    <TypewriterContainer>
      <TypewriterText>{text}</TypewriterText>
    </TypewriterContainer>
  );
};
