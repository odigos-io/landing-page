import React from 'react';
import { Montserrat } from 'next/font/google';
import './style.css';

const fontFamily = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});
const MirrorText = () => {
  return (
    <div className={`${fontFamily.className} luminance-container`}>Odigos</div>
  );
};

export default MirrorText;
