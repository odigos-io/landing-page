import { GOOGLE_MAPS_API_KEY } from '@/constants';

export interface LatLng {
  lat: number;
  lng: number;
}

interface LatitudeLongitude {
  latitude: number;
  longitude: number;
}

interface GoogleLocation {
  place_id: string;
  formatted_address: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  geometry: {
    location_type: string;
    location: LatLng;
    bounds: {
      northeast: LatLng;
      southwest: LatLng;
    };
    viewport: {
      northeast: LatLng;
      southwest: LatLng;
    };
  };
  navigation_points: {
    location: LatitudeLongitude;
  }[];
  types: string[];
}

interface GoogleApiResponse {
  status: string;
  error_message?: string;
  results: GoogleLocation[];
}

export const fetchCoordinates = async (location: string): Promise<LatLng | null> => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = (await response.json()) as GoogleApiResponse;

    if (data.results.length) {
      return data.results[0].geometry.location;
    } else {
      console.warn(data.status, data.error_message);
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
