import React from 'react';
import './style.css'; // Import your CSS file

const FloatingParagraph = () => {
  const value =
    'Odigos is built from the ground up for multimodality - make it easy to trace requests across multiple services, multiple protocols, and multiple datacenters.';

  return (
    <div className="floating-paragraph-container">
      <div className="floating-paragraph">
        {'Odigos is built from the ground up for  '}
        <span className="mark-span">{'multimodality'}</span>
        {
          '- make it easy to trace requests across multiple services, multiple protocols, and multiple datacenters.'
        }
      </div>
    </div>
  );
};

export default FloatingParagraph;
