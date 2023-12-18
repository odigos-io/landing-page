'use client';
import React from 'react';
import './ProgressBar.css';
import styled, { keyframes } from 'styled-components';

const progressBarAnimation = keyframes`
  from {
    width: 0;
  }
`;
const Progress = styled.div<{ width: any }>`
  height: 25px;
  transition: 1s ease;
  transition-delay: 0.5s;
  border-radius: 0.4rem;
  margin: 0;
  width: ${(props) => props.width || '100%'};
  animation: ${progressBarAnimation} 3s ease;
`;
export var ProgressBar = ({
  width = '100%',
  percent = '60%',
  status,
  value = '12',
  type = 'default',
}) => {
  function getBackground() {
    switch (type) {
      case 'default':
        return `linear-gradient(
                    90deg,
                    rgba(14, 230, 243, 1) 0%,
                    rgba(14, 230, 243, 0.6264880952380952) 87%,
                    rgba(14, 230, 243, 0.4332107843137255) 100%
                  )`;
      case 'basic':
        return `linear-gradient(
            90deg,
            rgba(255, 183, 3, 1) 0%,     
            rgba(255, 183, 3, 0.7) 87%,  
            rgba(255, 183, 3, 0.5) 100%  
          );`;
      case 'traditional':
        return `linear-gradient(
            90deg,
            rgba(251, 133, 0, 1) 0%,      
            rgba(251, 133, 0, 0.5) 87%,   
            rgba(251, 133, 0, 0.3) 100%   
          )`;
      default:
        break;
    }
  }

  return (
    <div className={'progressComp'}>
      <span className="label">{status}</span>
      <div className="progress-div" style={{ width }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Progress
            width={percent}
            style={{ width: percent, background: getBackground() }}
          />
          <span className="percent-number">{value}</span>
        </div>
      </div>
    </div>
  );
};
