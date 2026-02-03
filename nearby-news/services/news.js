import { config } from "../config";

/**
 * Fetch nearby news based on user location
 * @param {number} latitude - User's latitude
 * @param {number} longitude - User's longitude
 * @param {number} radius - Search radius in meters (default: 5000m = 5km)
 * @param {string} sort - Sort by 'distance' or 'time' (default: distance)
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Results per page (default: 10)
 * @returns {Promise<Object>} - API response with news array
 */
export const fetchNearbyNews = async ({
  latitude,
  longitude,
  radius = 5000,
  sort = "distance",
  page = 1,
  limit = 10,
}) => {
  try {
    console.log("Fetching nearby news:", { latitude, longitude, radius });
    
    const url = `${config.API_BASE_URL}/news/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}&sort=${sort}&page=${page}&limit=${limit}`;
    console.log("News API URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("News response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("News data received:", data);
    return { success: true, data: data.data || [] };
  } catch (error) {
    console.error("Error fetching nearby news:", error);
    return { success: false, error: error.message, data: [] };
  }
};

/**
 * Create a new news item
 * @param {string} content - News content
 * @param {number} latitude - News location latitude
 * @param {number} longitude - News location longitude
 * @returns {Promise<Object>} - API response
 */
export const createNews = async ({ content, latitude, longitude }) => {
  try {
    console.log("Creating news:", { content, latitude, longitude });

    const response = await fetch(`${config.API_BASE_URL}/news/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        latitude,
        longitude,
      }),
    });

    console.log("Create news response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("News created:", data);
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error creating news:", error);
    return { success: false, error: error.message };
  }
};
