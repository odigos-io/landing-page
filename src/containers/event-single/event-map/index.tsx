'use client';

import React, { useEffect, useState } from 'react';
import { fetchCoordinates } from '@/functions';
import { GOOGLE_MAPS_API_KEY } from '@/constants';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

interface EventMapProps {
  location?: string;
}

export const EventMap = ({ location }: EventMapProps) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  useEffect(() => {
    if (location) fetchCoordinates(location).then(setCoordinates).catch(console.error);
  }, [location]);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      {/* TODO: configure this after obtaining an API KEY */}
      <Map
        defaultCenter={{
          lat: coordinates.lat,
          lng: coordinates.lng,
        }}
        defaultZoom={3}
        gestureHandling='greedy'
        disableDefaultUI={true}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </APIProvider>
  );
};
