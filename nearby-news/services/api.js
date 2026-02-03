import { config } from "../config";

/**
 * Send location data to backend
 * @param {Object} location - Location object with latitude and longitude
 * @returns {Promise<Object>} - API response
 */
export const sendLocationToBackend = async (location) => {
  try {
    console.log("Sending location to backend:", location);
    console.log("API URL:", `${config.API_BASE_URL}/location/update`);
    
    const response = await fetch(`${config.API_BASE_URL}/location/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
      }),
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success response:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error sending location to backend:", error);
    return { success: false, error: error.message };
  }
};
