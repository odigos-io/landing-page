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
      }}
    >
      <SourceCard isHovered={isHovered} />
      <SourceCard isHovered={isHovered} name={'Products'} />
    </div>
  );
};

export default SourceCardList;
