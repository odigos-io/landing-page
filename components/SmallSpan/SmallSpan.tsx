'use client';
import React, { useEffect, useState } from 'react';
import './SmallSpan.css';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { Expand } from '@/public/icons';
import Image from 'next/image';

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export var SmallSpan = ({
  width = '100%',
  percent = '60%',
  status,
  value = '12',
  type = 'default',
  path = '',
  icon = '',
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-200px 0px 0px 0px',
  });

  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    // Set a timeout to show the second section after 5 seconds
    const timeoutId = setTimeout(() => {
      icon && setShowIcon(true);
    }, 1000);
    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [icon]);

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
      case 'https':
        return `linear-gradient(90deg, #4CAF50 0%, #2E7D32 50%, #388E3C 100%)`;
      case 'db':
        return `linear-gradient(90deg, #2196F3 0%, #1565C0 50%, #1976D2 100%)`;
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
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Image src={Expand} width={10} height={10} alt="" />
          <Progress
            inView={inView}
            style={{ width: 26, background: getBackground() }}
          >
            {showIcon && <Image src={icon} width={20} height={20} alt="" />}
          </Progress>
          <div style={{ color: getColor() }}>{value}</div>
          <div
            style={{
              color: getColor(),
              fontSize: 12,
              opacity: 0.6,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'end',
            }}
          >
            {path}
          </div>
        </div>
      </div>
    </div>
  );
};
