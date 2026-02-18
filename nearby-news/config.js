// config.js - Central configuration file
// This file reads from .env and provides configuration values to the app

// Remove trailing slash from API_BASE_URL to prevent double slashes in URLs
const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1"
).replace(/\/$/, "");

const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME || "NearYouNews";

const DEFAULT_RADIUS = parseInt(
  process.env.EXPO_PUBLIC_DEFAULT_RADIUS || "5000",
  10,
);

const UPDATE_INTERVAL = parseInt(
  process.env.EXPO_PUBLIC_UPDATE_INTERVAL || "120000",
  10,
);

export const config = {
  API_BASE_URL,
  APP_NAME,
  DEFAULT_RADIUS,
  UPDATE_INTERVAL,
};

export default config;
