import React from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  style = {},
  onClick,
}) => {
  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        src={src}
        alt={alt}
        style={style}
        layout="fill"
        loading="lazy"
        placeholder="blur"
        blurDataURL={src}
        onClick={onClick}
      />
    </div>
  );
};
