// config.js - Central configuration file
// This file reads from .env and provides configuration values to the app

// For Expo, environment variables need to be accessed at build time
// In production, you can use expo-constants or similar solutions

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";
const APP_NAME = process.env.APP_NAME || "NearYouNews";
const DEFAULT_RADIUS = parseInt(process.env.DEFAULT_RADIUS || "5000", 10);
const UPDATE_INTERVAL = parseInt(process.env.UPDATE_INTERVAL || "120000", 10);

export const config = {
  API_BASE_URL,
  APP_NAME,
  DEFAULT_RADIUS,
  UPDATE_INTERVAL,
};

export default config;
