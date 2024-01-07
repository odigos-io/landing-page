'use client';
import React from 'react';
import './ProgressBar.css';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';

const progressBarAnimation = keyframes`
  from {
    width: 0;
    opacity: 0;
    border-radius: 0.4rem;
  }
  to {
    opacity: 1;
  }
`;

const Progress = styled.div<{ width?: any; inView?: any }>`
  height: 25px;
  border-radius: 0.4rem;
  margin: 0;

  animation: ${(props) => (props.inView ? progressBarAnimation : 'none')} 3s
    ease;
`;

export var ProgressBar = ({
  width = '100%',
  percent = '60%',
  status,
  value = '12',
  type = 'default',
  delay = 0,
}) => {
  const [showAnimation, setShowAnimation] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, delay);
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-200px 0px 0px 0px',
    delay,
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

  return showAnimation ? (
    <div className={'progressComp'} ref={ref}>
      <span className="label">{status}</span>
      <div className="progress-div" style={{ width }}>
        <div>
          <Progress
            inView={inView}
            style={{
              width: percent,
              background: getBackground(),
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={'progressComp'} ref={ref} />
  );
};
