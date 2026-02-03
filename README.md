# NearYouNews

A location-based news application built with React Native (Expo) and Node.js/Express backend.

## Features

- Location-based news feed
- Post news with current location
- Filter news by radius (1-50km) and sort by distance/time
- Dark/Light theme toggle
- Auto-update location every 2 minutes
- Permission management for location access

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the mobile app directory:
   ```bash
   cd nearby-news
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your API configuration:
   ```env
   API_BASE_URL=http://your-local-ip:5000/api/v1
   APP_NAME=NearYouNews
   DEFAULT_RADIUS=5000
   UPDATE_INTERVAL=120000
   ```

   **Note:** For local development, use your computer's local IP address (not localhost). Find it with:
   - Linux: `ip addr show`
   - Windows: `ipconfig`
   - macOS: `ifconfig`

5. Start the Expo development server:
   ```bash
   npm start
   ```

## Environment Variables

### Backend (.env)

- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)

### Frontend (.env)

- `API_BASE_URL`: Backend API URL
- `APP_NAME`: Application name
- `DEFAULT_RADIUS`: Default search radius in meters (default: 5000)
- `UPDATE_INTERVAL`: Location update interval in milliseconds (default: 120000)

## Deployment Notes

When deploying to production:

1. Update `API_BASE_URL` in frontend `.env` to your production backend URL
2. Update `MONGO_URI` in backend `.env` to your production MongoDB instance
3. Set `NODE_ENV=production` in backend `.env`
4. Ensure `.env` files are not committed to version control

## Project Structure

```
nearyounews/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .env.example
│   └── index.js
└── nearby-news/
    ├── components/
    ├── context/
    ├── screens/
    ├── services/
    ├── .env
    ├── .env.example
    ├── config.js
    └── App.js
```
