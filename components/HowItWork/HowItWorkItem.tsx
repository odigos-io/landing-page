import React, { useState } from 'react';
import { FeatureTab } from '@/types/featureTab';
import SourceCardList from './source-list';
import TerminalText from '../TerminalText';
import DestList from './dest-list';

const HowItWorkItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, desc1 } = featureTab;

  return (
    <>
      <div
        style={{
          maxWidth: 400,
          height: 400,
          background: '#1d1c20',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,.08)',
          padding: 32,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex  gap-8 lg:gap-19"
      >
        <div className="">
          <h2 className="text-black dark:text-white text-3xl font-bold mb-7">
            {title}
          </h2>
          <p className="mb-5">{desc1}</p>
          {title === 'Install Odigos' && <TerminalText />}
          {title === 'Select Applications' && (
            <SourceCardList isHovered={isHovered} />
          )}
          {title === 'Choose Destinations' && (
            <DestList isHovered={isHovered} />
          )}
        </div>
      </div>
    </>
  );
};

export default HowItWorkItem;
