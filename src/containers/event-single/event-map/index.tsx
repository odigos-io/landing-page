'use client';

import React, { useEffect, useState } from 'react';
import { Text } from '@/components';
import { useMobile } from '@/contexts';
import { fetchCoordinates } from '@/functions';
import { GOOGLE_MAPS_API_KEY } from '@/constants';
import styled, { DefaultTheme, useTheme } from 'styled-components';
import { APIProvider, AdvancedMarker, InfoWindow, Map, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

interface EventMapProps {
  location?: string;
}

enum MapTypeId {
  HYBRID = 'hybrid',
  ROADMAP = 'roadmap',
  SATELLITE = 'satellite',
  TERRAIN = 'terrain',
}

enum MapGestureHandling {
  NONE = 'none',
  AUTO = 'auto',
  GREEDY = 'greedy',
  COOPERATIVE = 'cooperative',
}

const IS_DARK = false;
const MAP_CONFIG_INDEX = IS_DARK ? 1 : 0;

const MAP_CONFIGS = [
  {
    label: 'Light',
    mapId: '49ae42fed52588c3',
    mapTypeId: MapTypeId.ROADMAP,
    pin: () => <Pin background='#EA4335' borderColor='#B01D1D' glyphColor='#B01D1D' />,
  },
  {
    label: 'Dark',
    mapId: '739af084373f96fe',
    mapTypeId: MapTypeId.ROADMAP,
    pin: (theme: DefaultTheme) => <Pin background={theme.colors.purple} borderColor={theme.colors.purple_darker} glyphColor={theme.colors.cyan} />,
  },
];

const MapWrapper = styled.div`
  width: 100%;
  height: 330px;
  border-radius: 32px;
  overflow: hidden;
`;

export const EventMap = ({ location: loc }: EventMapProps) => {
  // trim the content in parentheses
  const location = loc?.replace(/\s*\([^)]*\)/, '');

  const theme = useTheme();
  const { isMobile } = useMobile();

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  useEffect(() => {
    if (location)
      fetchCoordinates(location)
        .then((coordinates) => coordinates && setCoordinates(coordinates))
        .catch(console.error);
  }, [location]);

  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowOpen, setInfowindowOpen] = useState(true);
  const toggleInfoWindow = () => setInfowindowOpen((prev) => !prev);

  if (!coordinates.lat && !coordinates.lng) return null;

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <MapWrapper>
        <Map
          // The map ID determines the map style.
          // For more info, see: https://developers.google.com/maps/documentation/javascript/map-ids/mapid-over
          // For examples, see: https://codesandbox.io/p/sandbox/github/visgl/react-google-maps/tree/main/examples/change-map-styles?file=%2Fsrc%2Fapp.tsx
          mapId={MAP_CONFIGS[MAP_CONFIG_INDEX].mapId}
          mapTypeId={MAP_CONFIGS[MAP_CONFIG_INDEX].mapTypeId}
          defaultCenter={coordinates}
          defaultZoom={4}
          gestureHandling={isMobile ? MapGestureHandling.COOPERATIVE : MapGestureHandling.GREEDY}
          disableDefaultUI
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <AdvancedMarker ref={markerRef} position={coordinates} title={location} clickable onClick={toggleInfoWindow}>
            {MAP_CONFIGS[MAP_CONFIG_INDEX].pin(theme)}
            {infoWindowOpen && <InfoWindow anchor={marker} onCloseClick={toggleInfoWindow} headerContent={<Text color={theme.colors.black}>{location}</Text>} />}
          </AdvancedMarker>
        </Map>
      </MapWrapper>
    </APIProvider>
  );
};
