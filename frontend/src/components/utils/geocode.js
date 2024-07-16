import axios from 'axios';

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

export const getCoordinates = async (location) => {
  try {
    console.log(`Fetching coordinates for location: ${location}`);
    
    const response = await axios.get(NOMINATIM_API_URL, {
      params: {
        q: location,
        format: 'json',
        limit: 1,
      },
    });

    console.log(`Nominatim response for ${location}:`, response.data);

    if (response.data.length === 0) {
      throw new Error('Location not found');
    }

    const { lat, lon } = response.data[0];
    const coordinates = [parseFloat(lon), parseFloat(lat)]; // Ensure the order is [lon, lat]
    
    console.log(`Parsed coordinates for ${location}:`, coordinates);
    return coordinates;
  } catch (error) {
    console.error(`Error fetching coordinates for location "${location}":`, error);
    throw error;
  }
};

