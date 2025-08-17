import { GOOGLE_MAPS_API_KEY } from '@/constants';

interface GoogleApiResponse {
  status: string;
  error_message: string;
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

export const fetchCoordinates = async (location: string) => {
  let coordinates = { lat: 0, lng: 0 };

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_MAPS_API_KEY}`);
    const data = (await response.json()) as GoogleApiResponse;

    // TODO: test this after obtaining an API KEY
    console.log(data);

    if (data.results.length) {
      coordinates = data.results[0].geometry.location;
    } else {
      console.warn(data.status, data.error_message);
    }
  } catch (error) {
    console.error(error);
  }

  return coordinates;
};
