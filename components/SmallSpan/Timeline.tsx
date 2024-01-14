'use client';
import React from 'react';
import './Timeline.css';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { RightArrow } from '@/public/icons';

const progressBarAnimation = keyframes`
  from {
    width: 0;
  }
`;

const Border = styled.div`
  border-left: 1px solid #e5e7eb;
  height: 25px;
`;

const Progress = styled.div<{ width?: any; inView?: any }>`
  height: 1px;
  transition: 1s ease;
  transition-delay: 0.5s;
  border-radius: 0.4rem;
  margin: 0;
  width: ${(props) => props.width || '0%'};
  opacity: ${(props) => (props.inView ? 1 : 0)};
  animation: ${(props) => (props.inView ? progressBarAnimation : 'none')} 2s
    ease;
`;

export const Timeline = ({
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
    return `linear-gradient(
        90deg,
        #c8c8c8 0%,     /* Gray */
        rgba(200, 200, 200, 0.6264880952380952) 87%,  /* Lighter Gray */
        rgba(200, 200, 200, 0.4332107843137255) 100%  /* Even Lighter Gray */
      )`;
  }

  return (
    <div className={'progressComp'} ref={ref}>
      <span className="base-time">{status}</span>
      <div className="progress-div" style={{ width }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Border />
          <Progress
            inView={inView}
            width={percent}
            style={{ width: percent, background: getBackground() }}
          />

          <Image src={RightArrow} width={16} height={16} alt="progressBar" />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: -3,
          }}
        >
          <span className="base-time">{'0'}</span>

          <span className="base-time">{'Request time'}</span>
        </div>
      </div>
    </div>
  );
};
