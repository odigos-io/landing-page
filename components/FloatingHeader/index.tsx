'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
const FloatingHeader = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      // You can adjust the threshold as needed
      if (offset > 700) {
        setSticky(true);
      } else {
        setSticky(false);
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
    <div className={`floating-header ${isSticky ? 'sticky' : ''}`}>
      <nav>
        <ul>
          <li>Home</li>
          <li>Blog</li>
          <li>Pricing</li>
          <li>Documentation</li>
        </ul>
      </nav>
    </div>
  );
};

export default FloatingHeader;
