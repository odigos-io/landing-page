import React, { useState } from 'react';
import { FeatureTab } from '@/types/featureTab';
import SourceCardList from './source-list';
import TerminalText from '../TerminalText';
import DestList from './dest-list';
import './style.css';

const HowItWorkItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, desc1 } = featureTab;

  return (
    <>
      <div
        style={{
          width: '20vw',
          minWidth: 250,
          maxWidth: 400,
          height: 350,
          background: '#1d1c20',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,.08)',
          padding: '1.5rem',
          flexDirection: 'column',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex"
      >
        <h2
          // style={{ width: 230 }}
          className="dark:text-white text-3xl font-bold mb-3"
        >
          {title}
        </h2>
        <p style={{ fontSize: 15 }} className="mb-5 p-text">
          {desc1}
        </p>
        {title === 'Install Odigos' && <TerminalText />}
        {title === 'Select Applications' && (
          <SourceCardList isHovered={isHovered} />
        )}
        {title === 'Choose Destinations' && <DestList isHovered={isHovered} />}
      </div>
    </>
  );
};

export default HowItWorkItem;
