import React, { useState } from 'react';
import Image from 'next/image';
const DestCard = ({ left, isHovered, image_url = '', top }) => {
  return (
    <div
      style={{
        width: isHovered ? 90 : 80,
        height: isHovered ? 90 : 80,
        backgroundColor: isHovered ? '#ffffffa9' : 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        position: 'absolute',
        left: isHovered ? left + 10 : left,
        top,
      }}
    >
      <Image
        loading="lazy"
        width={isHovered ? 60 : 50}
        height={isHovered ? 60 : 50}
        src={image_url}
        // style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(90%)' }}
        alt="Brand"
      />
    </div>
  );
};

export default DestCard;
