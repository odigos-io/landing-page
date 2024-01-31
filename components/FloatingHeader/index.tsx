'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import menuData from '../Header/menuData';
import Link from 'next/link';
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
          {menuData.map((item) => (
            <Link href={`${item.path}`}>
              <li
                className="transition duration-300 ease-in-out hover:underline"
                key={item.id}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FloatingHeader;
