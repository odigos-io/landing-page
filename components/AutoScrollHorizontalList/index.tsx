import React, { useRef, useEffect, useState } from 'react';
import './styles.css';
import SingleBrand from '../Brands/SingleBrand';
import brandData from '../Brands/brandData';

type BrandType = {
  id: number;
  name: string;
  logoUrl: string;
};

const duplicatedBrandData = [...brandData, ...brandData, ...brandData];

export default function AutoScrollHorizontalList() {
  const ref = useRef<HTMLDivElement>(null);
  const [animationState, setPlay] = useState<'paused' | 'running'>('paused');

  useEffect(() => {
    if (ref.current) {
      setPlay('running');
    }
  }, []);

  const renderCards = duplicatedBrandData.map(
    (brand: BrandType, index: number) => (
      <SingleBrand brand={brand} key={index} />
    )
  );

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
