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
    rootMargin: '-200px 0px 0px 0px',
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
            #c8c8c8 0%,     /* Gray */
            #c8c8c89f 87%,  /* Lighter Gray */
            #c8c8c86e 100%  /* Even Lighter Gray */
          )`;
      case 'traditional':
        return `linear-gradient(
            90deg,
            rgba(255, 77, 77, 1) 0%,     /* Red */
            rgba(255, 77, 77, 0.6264880952380952) 87%,  /* Lighter Red */
            rgba(255, 77, 77, 0.4332107843137255) 100%  /* Even Lighter Red */
          )`;
      case 'orange':
        return `rgb(255, 221, 183)`;
      case 'blue':
        return `rgb(7, 110, 255)`;
      case 'white-blue':
        return 'rgb(79, 171, 255)';
      case 'light-blue':
        return 'rgb(177, 197, 255)';
      case 'peach':
        return 'rgb(255, 183, 197)';
      default:
        break;
    }
  }

  return (
    <div className={'progressComp'} ref={ref}>
      <span className="label">{status}</span>
      <div className="progress-div" style={{ width }}>
        <div
          style={{
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            // width: percent,
            // borderRadius: '0.4rem',
            // background:
            //   'linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(7,110,255,0.7553615196078431) 90%)',
          }}
        >
          <Progress
            inView={inView}
            width={percent}
            style={{ width: percent, background: getBackground() }}
          />
        </div>
      </div>
    </div>
  );
};
