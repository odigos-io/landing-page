import React, { useState } from 'react';
import SourceCard from './source';

const SourceCardList = ({ isHovered }) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        zIndex: 999,
        width: 360,
        height: 300,
        overflow: 'scroll',
      }}
    >
      <SourceCard left={0} isHovered={isHovered} />
      <SourceCard left={220} isHovered={isHovered} />
    </div>
  );
};

export default SourceCardList;
