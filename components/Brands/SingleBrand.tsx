import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Brand } from '@/types/brand';
import { motion } from 'framer-motion';

const SingleBrand = ({ brand }: { brand: any }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { image_url, type, display_name, imageLight, id } = brand;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        textAlign: 'center',
        alignItems: 'center',
        position: 'relative',

        justifyContent: 'space-between',
      }}
    >
      <Image
        width={70}
        height={70}
        src={image_url}
        style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)' }}
        alt="Brand"
      />
      <div
        style={{
          color: isHovered ? '#fff' : '#424242',
          width: 150,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontWeight: 600,
        }}
      >
        {display_name}
      </div>
    </div>
  );
};

export default SingleBrand;
