'use client';

import React, { useEffect, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from '@/constants';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

interface EventMapProps {
  location?: string;
}

// TODO: test this after obtaining an API KEY
const fetchCoordinates = async (location?: string) => {
  if (!GOOGLE_MAPS_API_KEY || !location) return { lat: 0, lng: 0 };

  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_MAPS_API_KEY}`);
  const data = await response.json();
  const coordinates = data.results[0].geometry.location;

  console.log(data, coordinates);
  return coordinates;
};

export const EventMap = ({ location }: EventMapProps) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  useEffect(() => {
    fetchCoordinates(location).then(setCoordinates).catch(console.error);
  }, [location]);

  if (!GOOGLE_MAPS_API_KEY) return null;

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY || ''}>
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
