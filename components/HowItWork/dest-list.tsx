import React, { useState } from 'react';
import DestCard from './dest-card';

const brandData: any[] = [
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: '/dest/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: '/dest/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: '/dest/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: '/dest/gcp.svg',
  },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: '/dest/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: '/dest/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: '/dest/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: '/dest/logz.png',
  },
];

const DestList = ({ isHovered }) => {
  return (
    <div
      className="source-card-list-container"
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'relative',
        zIndex: 999,
        height: 100,
        width: '100%',
      }}
    >
      {brandData.slice(0, 4).map((brand, index) => (
        <DestCard
          top={0}
          left={index * 50}
          isHovered={false}
          image_url={brand.image_url}
        />
      ))}
    </div>
  );
};

export default DestList;
