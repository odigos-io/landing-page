import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import './styles.css';
import SingleBrand from '../Brands/SingleBrand';
import brandData from '../Brands/brandData';

export default function AutoScrollHorizontalList() {
  const ref = useRef<any>(null);
  const [animationState, setPlay] = useState('paused');
  useEffect(() => {
    if (ref.current) {
      setPlay('running');
    }
  }, []);

  const renderCards = brandData.map((brand, index) => {
    return <SingleBrand brand={brand} key={index} />;
  });
  return (
    <div
      style={{ overflow: 'hidden', marginTop: 100 }}
      onMouseEnter={() => setPlay('paused')}
      onMouseLeave={() => setPlay('running')}
    >
      <div
        className="d-flex"
        ref={ref}
        style={{
          animationPlayState: animationState,
        }}
      >
        {renderCards}
      </div>
    </div>
  );
}
