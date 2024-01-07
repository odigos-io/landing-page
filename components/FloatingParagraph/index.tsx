import React from 'react';
import './style.css'; // Import your CSS file

const FloatingParagraph = () => {
  const value =
    'Odigos is built from the ground up for multimodality - make it easy to trace requests across multiple services, multiple protocols, and multiple datacenters.';

  return (
    <div className="floating-paragraph-container">
      <div className="floating-paragraph">
        {'Simplify '}
        <span className="mark-span">{'OpenTelemetry'}</span>
        {
          ' complexity and eliminate performance overhead with the only platform that can generate distributed tracing across all your applications '
        }
        <span className="mark-span">{'without code changes.'}</span>
      </div>
    </div>
  );
};

export default FloatingParagraph;
