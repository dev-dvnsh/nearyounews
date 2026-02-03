import * as Location from "expo-location";

/**
 * Get the current location of the device
 * @returns {Promise<{latitude: number, longitude: number} | null>} - Returns location object or null
 */
export const getCurrentLocation = async () => {
  try {
    const currentLocation = await Location.getCurrentPositionAsync({});
    return {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
  } catch (error) {
    console.error("Error getting current location:", error);
    return null;
  }
};

/**
 * Request system location permissions
 * @returns {Promise<boolean>} - Returns true if permission granted
 */
export const requestSystemPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  } catch (error) {
    console.error("Error requesting location permission:", error);
    return false;
  }
};
