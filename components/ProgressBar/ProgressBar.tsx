'use client';
import React from 'react';
import './ProgressBar.css';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';

const progressBarAnimation = keyframes`
  from {
    width: 0;
  }
`;

const Progress = styled.div<{ width?: any; inView?: any }>`
  height: 25px;
  transition: 1s ease;
  transition-delay: 0.5s;
  border-radius: 0.4rem;
  margin: 0;
  width: ${(props) => props.width || '0%'};
  opacity: ${(props) => (props.inView ? 1 : 0)};
  animation: ${(props) => (props.inView ? progressBarAnimation : 'none')} 2s
    ease;
`;

export var ProgressBar = ({
  width = '100%',
  percent = '60%',
  status,
  value = '12',
  type = 'default',
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-600px 0px 0px 0px',
  });

  function getBackground() {
    switch (type) {
      case 'default':
        return `linear-gradient(
            90deg,
            #6aff79 0%,
            rgba(106, 255, 121, 0.6264880952380952) 87%,
            rgba(106, 255, 121, 0.4332107843137255) 100%
          )`;
      case 'basic':
        return `linear-gradient(
            90deg,
            rgba(200, 200, 200, 1) 0%,     /* Gray */
            rgba(200, 200, 200, 0.6264880952380952) 87%,  /* Lighter Gray */
            rgba(200, 200, 200, 0.4332107843137255) 100%  /* Even Lighter Gray */
          )`;
      case 'traditional':
        return `linear-gradient(
            90deg,
            rgba(255, 77, 77, 1) 0%,     /* Red */
            rgba(255, 77, 77, 0.6264880952380952) 87%,  /* Lighter Red */
            rgba(255, 77, 77, 0.4332107843137255) 100%  /* Even Lighter Red */
          )`;
      default:
        break;
    }
  }

  function getColor() {
    switch (type) {
      case 'default':
        return `#6aff79`;
      case 'basic':
        return `#c8c8c8`;
      case 'traditional':
        return `#ff4d4d`;
      default:
        break;
    }
  }

  return (
    <div className={'progressComp'} ref={ref}>
      <span className="label">{status}</span>
      <div className="progress-div" style={{ width }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Progress
            inView={inView}
            width={percent}
            style={{ width: percent, background: getBackground() }}
          />
          <span className="percent-number" style={{ color: getColor() }}>
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};
