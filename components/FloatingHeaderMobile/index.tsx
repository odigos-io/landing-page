'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import menuData from '../Header/menuData';
import Link from 'next/link';
const FloatingHeaderMobile = ({ stickToTop }) => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      // You can adjust the threshold as needed
      if (offset > 100 && !stickToTop) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`no-scrollbar floating-header-mobile ${
        showHeader ? 'sticky' : ''
      }`}
    >
      <nav>
        <ul>
          {menuData.map((item) => (
            <Link href={`${item.path}`}>
              <li key={item.id}>{item.title}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FloatingHeaderMobile;
