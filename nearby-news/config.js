// config.js - Central configuration file
// This file reads from .env and provides configuration values to the app

import {
  API_BASE_URL as ENV_API_BASE_URL,
  APP_NAME as ENV_APP_NAME,
  DEFAULT_RADIUS as ENV_DEFAULT_RADIUS,
  UPDATE_INTERVAL as ENV_UPDATE_INTERVAL,
} from "@env";

const API_BASE_URL = ENV_API_BASE_URL || "http://localhost:5000/api/v1";
const APP_NAME = ENV_APP_NAME || "NearYouNews";
const DEFAULT_RADIUS = parseInt(ENV_DEFAULT_RADIUS || "5000", 10);
const UPDATE_INTERVAL = parseInt(ENV_UPDATE_INTERVAL || "120000", 10);

export const config = {
  API_BASE_URL,
  APP_NAME,
  DEFAULT_RADIUS,
  UPDATE_INTERVAL,
};

export default config;
