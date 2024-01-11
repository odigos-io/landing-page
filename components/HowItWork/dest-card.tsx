import React, { useState } from 'react';
import Image from 'next/image';
import './style.css';
const DestCard = ({ left, isHovered, image_url = '', top }) => {
  return (
    <div
      className={`dest-card-container `}
      style={{
        width: isHovered ? 40 : 30,
        height: isHovered ? 40 : 30,
        backgroundColor: isHovered ? '#ffffffa9' : 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        // position: 'absolute',
        // left: isHovered ? left + 10 : left,
        top,
      }}
    >
      <Image
        loading="lazy"
        width={isHovered ? 30 : 40}
        height={isHovered ? 30 : 40}
        src={image_url}
        // style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(90%)' }}
        alt="Brand"
      />
    </div>
  );
};

export default DestCard;
