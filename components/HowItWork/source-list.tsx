import React, { useState } from 'react';
import SourceCard from './source';
import './style.css';
const SourceCardList = ({ isHovered }) => {
  return (
    <div
      className="source-card-list-container"
      style={{
        display: 'flex',
        position: 'relative',
        zIndex: 999,
        height: 200,
      }}
    >
      <SourceCard left={0} isHovered={isHovered} />
      <div className="mobile-view">
        <SourceCard left={220} isHovered={isHovered} />
      </div>
    </div>
  );
};

export default SourceCardList;
