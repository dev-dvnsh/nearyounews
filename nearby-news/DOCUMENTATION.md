# NearYouNews - Complete Beginner's Guide to React Native

---

## PROJECT OVERVIEW

**Title:** NearYouNews

**Purpose:** A location-based social news app where users can post and read news from people near them. Think of it like Twitter, but only showing posts from your neighborhood!

**Tech Stack:**
- **React Native** - Framework for building mobile apps using JavaScript
- **Expo** - Tools that make React Native development easier
- **React Navigation** - For moving between different screens
- **Expo Location** - For getting user's GPS coordinates
- **AsyncStorage** - For saving data on the phone
- **@expo/vector-icons** - For professional icons

**What This App Does:**
1. Gets your current location
2. Shows news posts from people nearby
3. Lets you post your own news
4. Filters news by distance (1km to 50km)
5. Switches between light and dark themes

---

## SECTION 1: REACT NATIVE FUNDAMENTALS FOR BEGINNERS

### 1.1 What is React Native?

**Simple Explanation:**
React Native is like a magical translator. You write code in JavaScript (a language that normally runs in web browsers), and React Native translates it into real native mobile apps for iPhone and Android.

**Analogy:**
Imagine you're building with Lego blocks. Each Lego piece is a "component" - buttons, text boxes, images. You snap them together to build your app. The cool part? The same Lego creation works on both iPhone and Android!

**Key Benefits:**
- Write once, run on iOS and Android
- Use JavaScript (easier than Swift or Kotlin)
- Hot reload: See changes instantly without restarting
- Huge community and libraries

### 1.2 Core Concepts Explained Simply

#### Components
**What:** Reusable pieces of UI, like Lego blocks

**Example:** A Button component can be used 10 times in your app
```javascript
// Think of this as a reusable "Button recipe"
function MyButton() {
  return <Button title="Click Me" />;
}
```

**Real-World Analogy:** Like a cookie cutter - you create the shape once, then use it to make many cookies.

#### Props (Properties)
**What:** Data you pass INTO a component

**Analogy:** Like giving instructions to a chef
```javascript
// You tell the Button what text to show and what to do when pressed
<Button 
  title="Save"           // ← This is a prop
  color="blue"           // ← This is a prop
  onPress={saveData}     // ← This is a prop
/>
```

**Key Rule:** Props flow DOWN from parent to child. A child cannot change props.

#### State
**What:** Data that a component REMEMBERS and can CHANGE

**Analogy:** Like a component's notebook where it writes things down
```javascript
// This component remembers how many times it was clicked
const [count, setCount] = useState(0);  // Start at 0

// Later, update the memory:
setCount(count + 1);  // Now it's 1, then 2, then 3...
```

**Key Rule:** When state changes, React automatically updates the screen!

#### JSX (JavaScript XML)
**What:** HTML-like syntax inside JavaScript

**Before you panic:** It looks weird at first, but it's just a friendlier way to write UI
```javascript
// This looks like HTML but it's actually JavaScript:
return (
  <View>
    <Text>Hello World</Text>
  </View>
);

// JSX gets converted to:
// React.createElement(View, null, 
//   React.createElement(Text, null, "Hello World")
// )
```

#### Hooks
**What:** Special functions that let components DO things

**Common Hooks:**
- `useState` - Remember data
- `useEffect` - Do something when component loads or updates
- `useContext` - Share data between components

**Analogy:** Hooks are like superpowers you give to your components.

```javascript
import { useState, useEffect } from 'react';

function Counter() {
  // useState hook: Remember the count
  const [count, setCount] = useState(0);
  
  // useEffect hook: Run code when component appears
  useEffect(() => {
    console.log('Component loaded!');
  }, []);
  
  return <Text>{count}</Text>;
}
```

---

## SECTION 2: PROJECT ARCHITECTURE

### 2.1 Folder Structure Walkthrough

```
nearby-news/
├── assets/              # 🖼️  Images, icons, fonts
├── components/          # 🧩 Reusable UI pieces (like Lego blocks)
├── context/             # 🌐 App-wide shared data
├── screens/             # 📱 Full page views
├── services/            # 🔧 Helper functions (API calls, location)
├── config.js            # ⚙️  App settings
├── App.js               # 🚪 Main entry point (front door)
├── index.js             # 🎬 Very first file that runs
└── package.json         # 📦 List of dependencies
```

**Detailed Explanation:**

#### `assets/` - Media Storage
**Purpose:** Store images, icons, fonts
**Analogy:** Your phone's photo album
**Example:** App logo, splash screen image
**Why separate:** Keeps code files separate from media files

#### `components/` - Reusable UI Pieces
**Purpose:** Components used across multiple screens
**Analogy:** A toolbox with screwdrivers, hammers (reusable tools)
**Example:** Custom button, news card, loading spinner
**Why separate:** Don't repeat yourself! Write once, use everywhere.

**Files in this folder:**
- `LocationPermission.js` - Asks user for location access
- `LocationSender.js` - Sends location to server every 2 minutes
- `NewsFeed.js` - Shows list of news posts

#### `screens/` - Full Page Views
**Purpose:** Complete pages users see and interact with
**Analogy:** Pages in a book
**Example:** Home screen, Settings screen, Profile screen
**Why separate:** Each screen is complex, deserves its own file

**Files in this folder:**
- `HomeScreen.js` - Main news feed page
- `AddNewsScreen.js` - Page to post new news
- `LocationScreen.js` - Page showing location tracking

#### `services/` - Business Logic
**Purpose:** Functions that DO things (API calls, calculations)
**Analogy:** The engine room of a ship
**Example:** Fetch data from server, get GPS location
**Why separate:** Keeps UI code separate from logic code

**Files in this folder:**
- `api.js` - Send location to backend
- `location.js` - Get GPS coordinates
- `news.js` - Fetch and create news posts

#### `context/` - Global State
**Purpose:** Data shared across the entire app
**Analogy:** A public bulletin board everyone can read
**Example:** Current user, theme (dark/light mode)
**Why separate:** Avoid passing props through 10 levels

**Files in this folder:**
- `ThemeContext.js` - Manages dark/light theme for entire app

---

## SECTION 3: FILE-BY-FILE EXPLANATION

### FILE: index.js
**Location:** `/nearby-news/index.js`

**Beginner Explanation:**
"This is THE VERY FIRST file that runs. Think of it as the ignition switch of a car. It starts everything."

**Code Breakdown:**
```javascript
// Line 1: Register the root component
import { registerRootComponent } from 'expo';

// EXPLANATION: Expo needs to know which component is the "main" one.
// This is like telling your phone "THIS is the app to launch"

// Line 2: Import our App component
import App from './App';

// EXPLANATION: We're grabbing the App component from App.js
// The './' means "same folder"

// Line 3: Disable native screens (special case for this app)
import { enableScreens } from 'react-native-screens';
enableScreens(false);

// EXPLANATION: This fixes a specific bug we had with navigation.
// You don't need to understand this deeply as a beginner.
// Just know: sometimes libraries conflict, and we add fixes.

// Line 4: Tell Expo "App is our main component"
registerRootComponent(App);

// EXPLANATION: This is the magic line that makes App.js run!
```

**Learning Points:**
- Every React Native app has ONE root component
- Import statements go at the top
- Order matters: import, then setup, then register

---

### FILE: App.js
**Location:** `/nearby-news/App.js`

**Beginner Explanation:**
"This is the heart of your app. It sets up navigation (moving between screens) and wraps everything in a theme provider for dark/light mode."

**Visual Diagram:**
```
┌─────────────────────────────────────┐
│      ThemeProvider (wrapper)        │  ← Provides dark/light theme
│  ┌───────────────────────────────┐  │
│  │   NavigationContainer         │  │  ← Enables screen navigation
│  │  ┌─────────────────────────┐  │  │
│  │  │   Tab Navigator         │  │  │  ← Bottom tabs
│  │  │  ┌──┬──────┬──┐        │  │  │
│  │  │  │🏠│  +  │📍│        │  │  │  ← Three tabs
│  │  │  └──┴──────┴──┘        │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Code Breakdown:**
```javascript
// ============================================
// SECTION 1: IMPORTS
// ============================================
import { NavigationContainer } from "@react-navigation/native";
// EXPLANATION: This wraps your app and enables navigation magic
// Like the spine of a book that lets you flip pages

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// EXPLANATION: Creates those bottom tabs (like Instagram or Twitter)

import { View, Text } from "react-native";
// EXPLANATION: Basic building blocks
// View = Container (like <div> in HTML)
// Text = Display text (like <p> in HTML)

import { Ionicons } from "@expo/vector-icons";
// EXPLANATION: Library with 1000+ professional icons

import { ThemeProvider, useTheme } from "./context/ThemeContext";
// EXPLANATION: Our custom code for dark/light theme

import HomeScreen from "./screens/HomeScreen";
import LocationScreen from "./screens/LocationScreen";
import AddNewsScreen from "./screens/AddNewsScreen";
// EXPLANATION: The three main screens of our app


// ============================================
// SECTION 2: CREATE TAB NAVIGATOR
// ============================================
const Tab = createBottomTabNavigator();
// EXPLANATION: This creates a "Tab" object we'll use to define tabs
// Think of it as creating a blueprint for the bottom navigation bar


// ============================================
// SECTION 3: APP NAVIGATOR COMPONENT
// ============================================
function AppNavigator() {
  // Get theme data from context
  const { theme, isDarkMode } = useTheme();
  // EXPLANATION: useTheme is a hook that connects to ThemeContext
  // It gives us: theme (colors), isDarkMode (true/false)

  return (
    <NavigationContainer>
      {/* EXPLANATION: NavigationContainer is the wrapper for ALL navigation */}
      
      <Tab.Navigator
        screenOptions={{
          // These options apply to ALL tabs
          headerShown: false,  // Hide the top header bar
          tabBarActiveTintColor: "#2196F3",  // Active tab = blue
          tabBarInactiveTintColor: isDarkMode ? "#888" : "#999",  // Inactive = gray
          tabBarStyle: {
            backgroundColor: theme.tabBar,  // Background color from theme
            borderTopColor: theme.tabBarBorder,  // Top border color
          },
        }}
      >
        {/* ============================================
            TAB 1: HOME SCREEN
            ============================================ */}
        <Tab.Screen 
          name="Home"  // Navigation name (used in code)
          component={HomeScreen}  // Which component to show
          options={{
            tabBarLabel: "Home",  // Text under icon
            tabBarIcon: ({ color, size }) => (
              // EXPLANATION: tabBarIcon is a function that returns an icon
              // It receives color and size automatically
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        {/* ============================================
            TAB 2: ADD NEWS (CENTER BUTTON)
            ============================================ */}
        <Tab.Screen 
          name="AddNews" 
          component={AddNewsScreen}
          options={{
            tabBarLabel: "",  // No text (looks cleaner)
            tabBarIcon: ({ color }) => (
              // EXPLANATION: Custom styled button in the middle
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,  // Makes it circular
                backgroundColor: "#2196F3",  // Blue background
                justifyContent: "center",  // Center content vertically
                alignItems: "center",  // Center content horizontally
                marginBottom: 20,  // Push it up above other tabs
              }}>
                <Text style={{ 
                  fontSize: 30, 
                  color: "#fff", 
                  fontWeight: "bold" 
                }}>+</Text>
              </View>
            ),
          }}
        />

        {/* ============================================
            TAB 3: LOCATION SCREEN
            ============================================ */}
        <Tab.Screen 
          name="Location" 
          component={LocationScreen}
          options={{
            tabBarLabel: "Location",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


// ============================================
// SECTION 4: MAIN APP COMPONENT
// ============================================
export default function App() {
  // EXPLANATION: This is the ROOT component - the top of the pyramid
  // Everything else lives inside this
  
  return (
    <ThemeProvider>
      {/* EXPLANATION: ThemeProvider wraps everything 
          Now ANY component can access dark/light theme! */}
      
      <AppNavigator />
      {/* EXPLANATION: Our navigation component defined above */}
    </ThemeProvider>
  );
}
```

**Learning Points:**
1. **Component Nesting:** Components wrap other components (like Russian dolls)
2. **Props with Functions:** `tabBarIcon` receives a function, not just data
3. **Context Wrapping:** ThemeProvider makes theme available everywhere
4. **Export Default:** Only ONE default export per file

**Common Beginner Questions:**
Q: "Why two components (App and AppNavigator)?"
A: Separation of concerns! App handles theme, AppNavigator handles navigation.

Q: "What's the arrow function ({ color, size }) => ()?"
A: It's a function that receives an object and returns JSX. Equivalent to:
```javascript
function(props) {
  return <Ionicons name="home" size={props.size} color={props.color} />;
}
```

---

### FILE: config.js
**Location:** `/nearby-news/config.js`

**Beginner Explanation:**
"This is your app's settings file. Instead of typing the API URL 50 times, we write it once here!"

**Analogy:**
Like a phone contact. Instead of typing "555-1234" every time, you save it as "Mom" and use that name.

**Code Breakdown:**
```javascript
// ============================================
// CONFIGURATION FILE
// Purpose: Central place for app settings
// ============================================

// EXPLANATION: Environment variables are settings that change
// between development (your computer) and production (real users)
// process.env reads from the .env file

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";
// EXPLANATION: 
// - Try to read API_BASE_URL from .env file
// - If not found, use "http://localhost:5000/api/v1" as backup
// - The || means "OR" - if left side is empty, use right side

const APP_NAME = process.env.APP_NAME || "NearYouNews";
// EXPLANATION: App name (shown in UI)

const DEFAULT_RADIUS = parseInt(process.env.DEFAULT_RADIUS || "5000", 10);
// EXPLANATION:
// - parseInt converts text to number
// - "5000" = 5000 meters = 5 kilometers
// - 10 means "base 10" (normal human numbers, not binary/hex)

const UPDATE_INTERVAL = parseInt(process.env.UPDATE_INTERVAL || "120000", 10);
// EXPLANATION:
// - How often to update location (in milliseconds)
// - 120000 ms = 120 seconds = 2 minutes

// ============================================
// EXPORT CONFIGURATION
// ============================================
export const config = {
  API_BASE_URL,
  APP_NAME,
  DEFAULT_RADIUS,
  UPDATE_INTERVAL,
};

// EXPLANATION: Now other files can import this:
// import { config } from './config';
// console.log(config.API_BASE_URL);

export default config;
// EXPLANATION: Default export allows:
// import config from './config';
```

**Why This Matters:**
- **DRY Principle:** Don't Repeat Yourself
- **Easy Updates:** Change API URL in ONE place
- **Environment Flexibility:** Different settings for dev/production

**Usage Example:**
```javascript
// ❌ BAD: Hardcoded everywhere
fetch("http://localhost:5000/api/v1/news");
fetch("http://localhost:5000/api/v1/location");
fetch("http://localhost:5000/api/v1/users");
// Problem: Need to change URL in 50 places!

// ✅ GOOD: Use config
import { config } from './config';
fetch(`${config.API_BASE_URL}/news`);
fetch(`${config.API_BASE_URL}/location`);
fetch(`${config.API_BASE_URL}/users`);
// Change URL once in config.js, all 50 places update!
```

---

## SECTION 4: COMPONENT DEEP DIVES

### COMPONENT: ThemeContext.js
**Location:** `/nearby-news/context/ThemeContext.js`

**Purpose:** Manage dark/light theme across the ENTIRE app

**Visual Analogy:** 
Think of this as a light switch on the wall. Any room (component) can check if the light is on (dark mode) or off (light mode).

**Why Context?**
Without context, you'd need to pass `isDarkMode` through EVERY component:
```
App → HomeScreen → NewsFeed → NewsCard → Text
```
With context, ANY component can directly access it!

**Code with Educational Comments:**
```javascript
// ============================================
// IMPORTS
// ============================================
import React, { createContext, useState, useContext } from "react";

// EXPLANATION OF IMPORTS:
// - React: The core library
// - createContext: Makes a "global storage" for data
// - useState: Hook to remember data
// - useContext: Hook to read from context


// ============================================
// CREATE CONTEXT
// ============================================
const ThemeContext = createContext();

// EXPLANATION: Creates an empty context
// Think of it as creating an empty box
// Later we'll put theme data in this box


// ============================================
// THEME PROVIDER COMPONENT
// ============================================
export const ThemeProvider = ({ children }) => {
  // EXPLANATION: 
  // - ThemeProvider is a component that wraps other components
  // - { children } = whatever components are inside <ThemeProvider>...</ThemeProvider>
  // - Think of it like a blanket that covers child components
  
  // STATE: Remember if dark mode is on/off
  const [isDarkMode, setIsDarkMode] = useState(false);
  // EXPLANATION:
  // - isDarkMode = current value (true or false)
  // - setIsDarkMode = function to change the value
  // - false = starts in light mode

  // THEME OBJECT: Colors for dark/light mode
  const theme = isDarkMode ? {
    // DARK MODE COLORS
    background: "#121212",      // Almost black background
    card: "#1E1E1E",            // Dark gray cards
    text: "#FFFFFF",            // White text
    subtext: "#B0B0B0",         // Light gray subtext
    border: "#333333",          // Dark borders
    modalBg: "#1E1E1E",         // Dark modal background
    tabBar: "#1E1E1E",          // Dark tab bar
    tabBarBorder: "#333333",    // Dark tab bar border
  } : {
    // LIGHT MODE COLORS
    background: "#f5f5f5",      // Light gray background
    card: "#fff",               // White cards
    text: "#333",               // Dark text
    subtext: "#666",            // Medium gray subtext
    border: "#e0e0e0",          // Light borders
    modalBg: "#fff",            // White modal background
    tabBar: "#fff",             // White tab bar
    tabBarBorder: "#e0e0e0",    // Light tab bar border
  };
  
  // EXPLANATION OF TERNARY OPERATOR:
  // condition ? valueIfTrue : valueIfFalse
  // Like saying: "If it's raining, bring umbrella, else bring sunglasses"

  // TOGGLE FUNCTION: Switch between dark/light
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  // EXPLANATION:
  // - !isDarkMode means "opposite of isDarkMode"
  // - If isDarkMode is true, !isDarkMode is false (and vice versa)
  // - This flips the switch!

  // RENDER: Wrap children with context provider
  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {/* EXPLANATION:
          - ThemeContext.Provider makes data available to children
          - value={{ }} is the data we're sharing
          - {children} renders whatever's inside <ThemeProvider>
      */}
      {children}
    </ThemeContext.Provider>
  );
};


// ============================================
// CUSTOM HOOK: Easy way to use theme
// ============================================
export const useTheme = () => {
  // EXPLANATION: This is a custom hook (starts with "use")
  // It's a shortcut to access theme data
  
  const context = useContext(ThemeContext);
  // EXPLANATION: useContext reads from ThemeContext
  
  if (!context) {
    // ERROR HANDLING: If used outside ThemeProvider, throw error
    throw new Error("useTheme must be used within a ThemeProvider");
    // EXPLANATION: This prevents bugs from using theme incorrectly
  }
  
  return context;
  // EXPLANATION: Return { isDarkMode, theme, toggleTheme }
};


// ============================================
// HOW TO USE THIS IN OTHER COMPONENTS
// ============================================
/*
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { isDarkMode, theme, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>Hello</Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
}
*/
```

**Learning Points:**
1. **Context = Global State:** Any component can access it
2. **Provider Pattern:** Wrap components to give them access
3. **Custom Hooks:** Make your own hooks for convenience
4. **Ternary Operator:** Shorthand for if-else

**Visual Data Flow:**
```
┌──────────────────────────────────┐
│     ThemeProvider                │
│  isDarkMode: false               │  ← State lives here
│  theme: { background: "#f5f5f5" }│
│  toggleTheme: () => {...}        │
└──────────────┬───────────────────┘
               │ (Provides data)
               │
    ┌──────────┼──────────┐
    │          │          │
    ▼          ▼          ▼
 Home    AddNews    Location  ← Any component can read/update
```

---

### COMPONENT: NewsFeed.js
**Location:** `/nearby-news/components/NewsFeed.js`

**Purpose:** Display a scrollable list of news posts from nearby people

**Visual Description:**
```
┌─────────────────────────────────┐
│  NearYouNews          ☰ Filter  │ ← Header (tap title = toggle theme)
│  23 items                        │
├─────────────────────────────────┤
│  Traffic jam on Main St         │ ← News Card
│  📍 2.3km away    🕒 5m ago     │
├─────────────────────────────────┤
│  New cafe opened!               │ ← News Card
│  📍 1.1km away    🕒 1h ago     │
├─────────────────────────────────┤
│  ...more news...                │
└─────────────────────────────────┘
     (Pull down to refresh)
```

**Props Accepted:**
- `location` (object): User's GPS coordinates { latitude, longitude }

**State Management:**
- `news` (array): List of news posts
- `loading` (boolean): Is data loading?
- `refreshing` (boolean): Is user pulling to refresh?
- `error` (string): Error message if fetch fails
- `radius` (number): Search distance in meters
- `sort` (string): "distance" or "time"
- `showFilters` (boolean): Is filter modal open?
- `tempRadius` (number): Temporary radius (before applying)
- `tempSort` (string): Temporary sort (before applying)

**Code with Educational Comments:**
```javascript
// ============================================
// IMPORTS
// ============================================
import { 
  View,              // Container component
  Text,              // Display text
  StyleSheet,        // Create styles
  FlatList,          // Efficient scrolling list
  TouchableOpacity,  // Tappable component
  RefreshControl,    // Pull-to-refresh functionality
  ActivityIndicator, // Loading spinner
  Modal              // Popup overlay
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { fetchNearbyNews } from "../services/news";
import { useTheme } from "../context/ThemeContext";


// ============================================
// COMPONENT DEFINITION
// ============================================
export default function NewsFeed({ location }) {
  // EXPLANATION: Receives location as a prop from parent
  
  // STATE: Data this component remembers
  const [news, setNews] = useState([]);
  // EXPLANATION: Stores array of news posts
  
  const [loading, setLoading] = useState(true);
  // EXPLANATION: Are we currently fetching data?
  
  const [refreshing, setRefreshing] = useState(false);
  // EXPLANATION: Is user pulling down to refresh?
  
  const [error, setError] = useState(null);
  // EXPLANATION: Stores error message (if any)
  
  const [radius, setRadius] = useState(5000);
  // EXPLANATION: Current search radius (5km default)
  
  const [sort, setSort] = useState("distance");
  // EXPLANATION: How to sort news ("distance" or "time")
  
  const [showFilters, setShowFilters] = useState(false);
  // EXPLANATION: Is the filter modal visible?
  
  const [tempRadius, setTempRadius] = useState(5000);
  const [tempSort, setTempSort] = useState("distance");
  // EXPLANATION: Temporary values while user adjusts filters
  // Only become "real" when user clicks "Apply"

  // THEME: Get theme colors from context
  const { isDarkMode, theme, toggleTheme } = useTheme();
  
  // RADIUS OPTIONS: Available filter choices
  const radiusOptions = [
    { label: "1km", value: 1000 },
    { label: "5km", value: 5000 },
    { label: "10km", value: 10000 },
    { label: "20km", value: 20000 },
    { label: "50km", value: 50000 },
  ];


  // ============================================
  // EFFECT: Load news when location/radius/sort changes
  // ============================================
  useEffect(() => {
    // EXPLANATION: useEffect runs code when dependencies change
    // Dependencies are in the [] array at the end
    
    if (location) {
      // Only load news if we have location
      loadNews();
    }
  }, [location, radius, sort]);
  // EXPLANATION: Run this code when location, radius, or sort changes


  // ============================================
  // FUNCTION: Load news from API
  // ============================================
  const loadNews = async () => {
    // EXPLANATION: async = this function does asynchronous work
    // (waiting for network responses)
    
    if (!location) return;  // Exit early if no location
    
    setLoading(true);   // Show loading spinner
    setError(null);     // Clear previous errors

    // CALL API: Fetch news from backend
    const result = await fetchNearbyNews({
      latitude: location.latitude,
      longitude: location.longitude,
      radius,
      sort,
    });
    // EXPLANATION: await = wait for the API call to finish

    if (result.success) {
      setNews(result.data);  // Update state with news
    } else {
      setError(result.error || "Failed to load news");
    }
    
    setLoading(false);  // Hide loading spinner
  };


  // ============================================
  // FUNCTION: Handle pull-to-refresh
  // ============================================
  const onRefresh = async () => {
    setRefreshing(true);   // Show refresh indicator
    await loadNews();       // Reload news
    setRefreshing(false);  // Hide refresh indicator
  };


  // ============================================
  // FUNCTION: Format distance for display
  // ============================================
  const formatDistance = (distanceKm) => {
    // EXPLANATION: Backend sends distance in kilometers
    
    if (distanceKm < 1) {
      // Less than 1km? Show meters
      return `${Math.round(distanceKm * 1000)}m away`;
    }
    // Otherwise show kilometers with 1 decimal
    return `${distanceKm.toFixed(1)}km away`;
  };


  // ============================================
  // FUNCTION: Format timestamp for display
  // ============================================
  const formatTime = (timestamp) => {
    // EXPLANATION: Convert database timestamp to human-readable time
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;  // Difference in milliseconds
    
    // Convert to minutes, hours, days
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    // Return appropriate format
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };


  // ============================================
  // FUNCTION: Render a single news card
  // ============================================
  const renderNewsItem = ({ item }) => (
    // EXPLANATION: FlatList calls this for each news item
    // item = one news post
    
    <View style={[styles.newsCard, { backgroundColor: theme.card }]}>
      <Text style={[styles.newsContent, { color: theme.text }]}>
        {item.content}
      </Text>
      
      <View style={[styles.newsFooter, { borderTopColor: theme.border }]}>
        <View style={styles.metaItem}>
          <Ionicons name="location" size={14} color={theme.subtext} />
          <Text style={[styles.distance, { color: theme.subtext }]}>
            {formatDistance(item.distanceKm)}
          </Text>
        </View>
        
        <View style={styles.metaItem}>
          <Ionicons name="time" size={14} color={theme.subtext} />
          <Text style={[styles.time, { color: theme.subtext }]}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );


  // ============================================
  // CONDITIONAL RENDERING: Show different UI based on state
  // ============================================
  
  // IF NO LOCATION: Show waiting message
  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.infoText}>Waiting for location...</Text>
      </View>
    );
  }

  // IF LOADING (NOT REFRESHING): Show spinner
  if (loading && !refreshing) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={[styles.loadingText, { color: theme.subtext }]}>
          Loading nearby news...
        </Text>
      </View>
    );
  }

  // IF ERROR: Show error message and retry button
  if (error) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <Ionicons name="alert-circle" size={48} color="#f44336" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadNews}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }


  // ============================================
  // MAIN RENDER: News feed with header and list
  // ============================================
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* ============================================
          HEADER: App title and filter button
          ============================================ */}
      <View style={[styles.header, { 
        backgroundColor: theme.card, 
        borderBottomColor: theme.border 
      }]}>
        
        {/* Tappable title (toggles theme) */}
        <TouchableOpacity onPress={toggleTheme}>
          <View style={styles.titleContainer}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              NearYouNews
            </Text>
            <Ionicons 
              name={isDarkMode ? "sunny" : "moon"} 
              size={16} 
              color={isDarkMode ? "#FFA500" : "#666"} 
              style={styles.themeIcon}
            />
          </View>
          <Text style={[styles.headerSubtitle, { color: theme.subtext }]}>
            {news.length} items
          </Text>
        </TouchableOpacity>
        
        {/* Filter button */}
        <TouchableOpacity 
          style={styles.filterIcon} 
          onPress={() => {
            setTempRadius(radius);
            setTempSort(sort);
            setShowFilters(true);
          }}
        >
          <Ionicons name="funnel-outline" size={22} color="#2196F3" />
        </TouchableOpacity>
      </View>

      
      {/* ============================================
          FILTER MODAL: Popup for adjusting filters
          ============================================ */}
      <Modal
        visible={showFilters}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.modalBg }]}>
            
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Filters
              </Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={[styles.closeButton, { color: theme.subtext }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Radius Options */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.text }]}>
                Radius:
              </Text>
              <View style={styles.filterButtons}>
                {radiusOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.filterButton, 
                      tempRadius === option.value && styles.filterButtonActive
                    ]}
                    onPress={() => setTempRadius(option.value)}
                  >
                    <Text style={[
                      styles.filterButtonText, 
                      tempRadius === option.value && styles.filterButtonTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort Options */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.text }]}>
                Sort by:
              </Text>
              <View style={styles.filterButtons}>
                <TouchableOpacity
                  style={[
                    styles.filterButton, 
                    tempSort === "distance" && styles.filterButtonActive
                  ]}
                  onPress={() => setTempSort("distance")}
                >
                  <View style={styles.filterButtonContent}>
                    <Ionicons 
                      name="location" 
                      size={16} 
                      color={tempSort === "distance" ? "#fff" : "#666"}
                    />
                    <Text style={[
                      styles.filterButtonText, 
                      tempSort === "distance" && styles.filterButtonTextActive
                    ]}>
                      Distance
                    </Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.filterButton, 
                    tempSort === "time" && styles.filterButtonActive
                  ]}
                  onPress={() => setTempSort("time")}
                >
                  <View style={styles.filterButtonContent}>
                    <Ionicons 
                      name="time" 
                      size={16} 
                      color={tempSort === "time" ? "#fff" : "#666"}
                    />
                    <Text style={[
                      styles.filterButtonText, 
                      tempSort === "time" && styles.filterButtonTextActive
                    ]}>
                      Recent
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Apply Button */}
            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={() => {
                setRadius(tempRadius);   // Apply temp values
                setSort(tempSort);
                setShowFilters(false);   // Close modal
              }}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      {/* ============================================
          NEWS LIST: FlatList of news cards
          ============================================ */}
      {news.length === 0 ? (
        // EMPTY STATE: No news found
        <View style={styles.emptyContainer}>
          <Ionicons name="newspaper-outline" size={64} color={theme.subtext} />
          <Text style={[styles.emptyText, { color: theme.subtext }]}>
            No news nearby
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.subtext }]}>
            Be the first to post something in this area!
          </Text>
        </View>
      ) : (
        // NEWS LIST: Show news items
        <FlatList
          data={news}              // Array of news items
          renderItem={renderNewsItem}  // Function to render each item
          keyExtractor={(item) => item._id}  // Unique key for each item
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={["#2196F3"]} 
            />
          }
        />
      )}
    </View>
  );
}


// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: { 
    flex: 1,  // Take all available space
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: "center",  // Center vertically
    alignItems: "center",      // Center horizontally
  },
  header: { 
    padding: 16, 
    paddingTop: 30,  // Extra padding for status bar
    borderBottomWidth: 1, 
    flexDirection: "row",  // Horizontal layout
    justifyContent: "space-between",  // Space between title and filter
    alignItems: "center",
  },
  titleContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8 
  },
  themeIcon: { 
    marginLeft: 8 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  headerSubtitle: { 
    fontSize: 12, 
    marginTop: 4 
  },
  filterIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: "#f5f5f5", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  
  // Modal styles
  modalOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent black
    justifyContent: "flex-end"  // Slide up from bottom
  },
  modalContent: { 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    padding: 24, 
    maxHeight: "70%" 
  },
  modalHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 24 
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: "bold" 
  },
  closeButton: { 
    fontSize: 28, 
    fontWeight: "300" 
  },
  
  // Filter styles
  filterSection: { 
    marginBottom: 24 
  },
  filterLabel: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 12 
  },
  filterButtons: { 
    flexDirection: "row", 
    flexWrap: "wrap"  // Wrap to next line if needed
  },
  filterButton: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
    backgroundColor: "#f5f5f5", 
    borderWidth: 1, 
    borderColor: "#e0e0e0", 
    marginRight: 8, 
    marginBottom: 8 
  },
  filterButtonActive: { 
    backgroundColor: "#2196F3", 
    borderColor: "#2196F3" 
  },
  filterButtonText: { 
    fontSize: 14, 
    color: "#666", 
    fontWeight: "500" 
  },
  filterButtonTextActive: { 
    color: "#fff" 
  },
  filterButtonContent: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 6 
  },
  applyButton: { 
    backgroundColor: "#2196F3", 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: "center", 
    marginTop: 8 
  },
  applyButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  
  // News card styles
  listContent: { 
    padding: 16 
  },
  newsCard: { 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3  // Android shadow
  },
  newsContent: { 
    fontSize: 16, 
    lineHeight: 24, 
    marginBottom: 12 
  },
  newsFooter: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    borderTopWidth: 1, 
    paddingTop: 8 
  },
  metaItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 4 
  },
  distance: { 
    fontSize: 12, 
    marginLeft: 4 
  },
  time: { 
    fontSize: 12, 
    marginLeft: 4 
  },
  
  // Empty state
  emptyContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 32 
  },
  emptyText: { 
    fontSize: 18, 
    marginTop: 16, 
    marginBottom: 8 
  },
  emptySubtext: { 
    fontSize: 14, 
    textAlign: "center" 
  },
  
  // Loading/error states
  loadingText: { 
    marginTop: 16, 
    fontSize: 14 
  },
  errorText: { 
    fontSize: 16, 
    color: "#f44336", 
    marginBottom: 16, 
    textAlign: "center" 
  },
  retryButton: { 
    backgroundColor: "#2196F3", 
    paddingVertical: 12, 
    paddingHorizontal: 32, 
    borderRadius: 8 
  },
  retryButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  infoText: { 
    fontSize: 14 
  },
});
```

**Learning Points:**
1. **FlatList:** Efficient for long lists (only renders visible items)
2. **Pull-to-Refresh:** RefreshControl component handles this
3. **Conditional Rendering:** `{condition ? <A /> : <B />}` or `{condition && <A />}`
4. **Modal:** Overlay that appears on top of content
5. **Array.map():** Loops through array to create multiple components
6. **StyleSheet.create():** Creates optimized styles

**Common Beginner Questions:**

Q: "What's the difference between `loading` and `refreshing`?"
A: `loading` = initial load (show spinner), `refreshing` = pull-to-refresh (show refresh indicator at top)

Q: "Why tempRadius and radius?"
A: UX pattern! User can adjust filters without immediately changing the news. Only when they click "Apply" do the temp values become real.

Q: "What's renderItem={}?"
A: FlatList needs a function that says "here's how to render ONE item". We pass our renderNewsItem function.

---

## SECTION 5: SERVICES EXPLAINED

### SERVICE: location.js
**Location:** `/nearby-news/services/location.js`

**Purpose:** Get user's GPS coordinates using Expo Location API

**Analogy:** Like asking your phone "Where am I?" and getting coordinates back

**Code Breakdown:**
```javascript
// ============================================
// IMPORTS
// ============================================
import * as Location from "expo-location";
// EXPLANATION: Import the entire Location module
// * means "import everything"


// ============================================
// FUNCTION: Request location permission
// ============================================
export const requestSystemPermission = async () => {
  // EXPLANATION: Asks user for location access
  // Returns true if granted, false if denied
  
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    // EXPLANATION: Show system permission popup
    // foreground = only when app is open (not in background)
    
    return status === "granted";
    // EXPLANATION: Return true if user tapped "Allow"
    
  } catch (error) {
    console.error("Error requesting permission:", error);
    return false;
  }
};


// ============================================
// FUNCTION: Get current GPS location
// ============================================
export const getCurrentLocation = async () => {
  // EXPLANATION: Get latitude and longitude
  
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      // EXPLANATION: Use GPS for accurate location (not just cell towers)
    });
    
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    // EXPLANATION: Return simplified object with just lat/lng
    
  } catch (error) {
    console.error("Error getting location:", error);
    return null;
  }
};
```

**Learning Points:**
- **Async/Await:** Wait for promises to resolve
- **Try/Catch:** Handle errors gracefully
- **Destructuring:** `const { status } = ...` extracts status property
- **Named Exports:** `export const` allows multiple exports per file

---

### SERVICE: api.js
**Location:** `/nearby-news/services/api.js`

**Purpose:** Send location updates to backend server

**Code Breakdown:**
```javascript
import { config } from "../config";

// ============================================
// FUNCTION: Send location to backend
// ============================================
export const sendLocationToBackend = async (location) => {
  try {
    console.log("Sending location to backend:", location);
    console.log("API URL:", `${config.API_BASE_URL}/location/update`);
    
    // MAKE API CALL
    const response = await fetch(`${config.API_BASE_URL}/location/update`, {
      method: "POST",
      // EXPLANATION: POST = sending data (vs GET = requesting data)
      
      headers: {
        "Content-Type": "application/json",
        // EXPLANATION: Tell server we're sending JSON data
      },
      
      body: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
      }),
      // EXPLANATION: Convert JavaScript object to JSON string
    });

    console.log("Response status:", response.status);
    
    // CHECK IF SUCCESSFUL
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error response:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // PARSE RESPONSE
    const data = await response.json();
    // EXPLANATION: Convert JSON string back to JavaScript object
    
    console.log("Location sent successfully:", data);
    return { success: true, data };
    
  } catch (error) {
    console.error("Error sending location:", error);
    return { success: false, error: error.message };
  }
};
```

**Learning Points:**
- **fetch():** Built-in function for API calls
- **JSON.stringify():** Object → JSON string (for sending)
- **response.json():** JSON string → Object (for receiving)
- **Template Literals:** \`${variable}\` embeds variables in strings

---

## SECTION 6: DATA FLOW DIAGRAM

### User Posts News Flow
```
User types content
        ↓
Taps "Post" button
        ↓
AddNewsScreen.handlePost()
        ↓
Validates content & location
        ↓
services/news.createNews()
        ↓
fetch() → POST /api/v1/news/create
        ↓
Backend saves to MongoDB
        ↓
Response returns success
        ↓
Show success alert
        ↓
Navigate to Home screen
        ↓
NewsFeed reloads automatically
```

### Theme Toggle Flow
```
User taps "NearYouNews" title
        ↓
NewsFeed calls toggleTheme()
        ↓
ThemeContext: setIsDarkMode(!isDarkMode)
        ↓
State changes: isDarkMode = true/false
        ↓
React re-renders ALL components using theme
        ↓
Components read new theme colors
        ↓
UI updates across entire app
        ↓
Tab bar, cards, text all change color
```

### Location Update Flow
```
App starts
        ↓
LocationSender component loads
        ↓
Asks for location permission
        ↓
User grants permission
        ↓
services/location.getCurrentLocation()
        ↓
GPS returns coordinates
        ↓
services/api.sendLocationToBackend()
        ↓
POST to server every 2 minutes
        ↓
Backend stores location
        ↓
(Loop continues...)
```

---

## SECTION 7: COMMON PATTERNS IN THIS PROJECT

### Pattern 1: Render Props Pattern
**Used In:** LocationPermission.js

**What:** Pass children as a function that receives data
```javascript
// DEFINITION
<LocationPermission>
  {({ location, errorMsg, isLoading }) => (
    // Use location, errorMsg, isLoading here
    <Text>{location ? 'Got location!' : 'Waiting...'}</Text>
  )}
</LocationPermission>

// WHY: Parent manages complex logic (permissions, loading)
//      Child just receives clean data and renders UI
```

**Benefits:**
- Separation of concerns
- Reusable permission logic
- Child components stay simple

### Pattern 2: Container/Presenter Pattern
**Used In:** HomeScreen.js & NewsFeed.js

**What:** Split logic and UI into separate components
```javascript
// CONTAINER (HomeScreen.js)
// - Handles data fetching
// - Manages state
// - Passes data to presenter
function HomeScreen() {
  const location = useLocation();  // Logic
  return <NewsFeed location={location} />;  // Pass to presenter
}

// PRESENTER (NewsFeed.js)
// - Receives data as props
// - Renders UI
// - Minimal logic
function NewsFeed({ location }) {
  return <View>...</View>;  // Just display
}
```

**Benefits:**
- Easy to test (test logic separately from UI)
- Reusable presenters with different containers
- Clear separation of concerns

### Pattern 3: Custom Hooks
**Used In:** ThemeContext.js (useTheme)

**What:** Extract reusable logic into custom hooks
```javascript
// CUSTOM HOOK
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Must use within provider");
  return context;
};

// USAGE
function MyComponent() {
  const { theme } = useTheme();  // Simple!
  return <View style={{ backgroundColor: theme.background }} />;
}

// WITHOUT CUSTOM HOOK (verbose)
function MyComponent() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("...");
  const theme = context.theme;
  return <View style={{ backgroundColor: theme.background }} />;
}
```

**Benefits:**
- DRY (Don't Repeat Yourself)
- Consistent error handling
- Cleaner component code

### Pattern 4: Optimistic UI Updates
**Used In:** AddNewsScreen.js

**What:** Show success immediately, handle errors later
```javascript
// PESSIMISTIC (wait for response)
const handlePost = async () => {
  const result = await createNews(content);
  if (result.success) {
    showSuccess();  // ← User waits for server
  }
};

// OPTIMISTIC (assume success)
const handlePost = async () => {
  showSuccess();  // ← Instant feedback!
  createNews(content).catch(error => {
    showError();  // Only show error if it fails
  });
};
```

**Benefits:**
- App feels faster
- Better user experience
- Less perceived latency

---

## SECTION 8: STYLING GUIDE

### Three Ways to Style in React Native

#### 1. Inline Styles
**Use Case:** Quick, one-off styles
```javascript
<View style={{ backgroundColor: 'red', padding: 10 }}>
  <Text style={{ color: 'white' }}>Hello</Text>
</View>
```

**Pros:** Fast, good for dynamic styles
**Cons:** Not optimized, clutters JSX

#### 2. StyleSheet (Recommended!)
**Use Case:** Most component styles
```javascript
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
  },
  text: {
    color: 'white',
  },
});

<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>
```

**Pros:** Optimized, organized, reusable
**Cons:** None really, this is the standard

#### 3. External Stylesheet Files
**Use Case:** Shared styles across components
```javascript
// styles/common.js
export const commonStyles = StyleSheet.create({
  button: { ... },
  text: { ... },
});

// MyComponent.js
import { commonStyles } from './styles/common';
<View style={commonStyles.button} />
```

**Pros:** DRY, consistent design
**Cons:** Extra file complexity

### Flexbox Basics (Mobile Layout)

**Key Concept:** Flexbox is THE way to layout in React Native. Think of it like organizing items on a shelf.

#### Main Properties:
```javascript
<View style={{
  // CONTAINER PROPERTIES:
  flexDirection: 'row',       // Horizontal (default: 'column' = vertical)
  justifyContent: 'center',   // Main axis alignment
  alignItems: 'center',       // Cross axis alignment
  flex: 1,                    // Take available space
  
  // ITEM PROPERTIES:
  flexGrow: 1,                // Grow to fill space
  flexShrink: 1,              // Shrink if needed
  flexBasis: 100,             // Base size before growing/shrinking
}}>
```

#### Visual Examples:
```javascript
// EXAMPLE 1: Center everything
<View style={{
  flex: 1,
  justifyContent: 'center',  // Center vertically
  alignItems: 'center',      // Center horizontally
}}>
  <Text>Perfectly centered!</Text>
</View>

// EXAMPLE 2: Header with left, center, right items
<View style={{
  flexDirection: 'row',           // Horizontal layout
  justifyContent: 'space-between', // Spread items apart
  alignItems: 'center',            // Vertically center
}}>
  <Text>Left</Text>
  <Text>Center</Text>
  <Text>Right</Text>
</View>

// EXAMPLE 3: Responsive cards
<View style={{
  flexDirection: 'row',
  flexWrap: 'wrap',    // Wrap to next line if needed
}}>
  <View style={{ width: '48%', margin: '1%' }} />  {/* Card 1 */}
  <View style={{ width: '48%', margin: '1%' }} />  {/* Card 2 */}
  <View style={{ width: '48%', margin: '1%' }} />  {/* Card 3 */}
  {/* Automatically wraps to next row! */}
</View>
```

#### Common Flexbox Combinations:
```javascript
// Full screen container
{ flex: 1 }

// Centered content
{ flex: 1, justifyContent: 'center', alignItems: 'center' }

// Horizontal row with space between
{ flexDirection: 'row', justifyContent: 'space-between' }

// Bottom-aligned content
{ flex: 1, justifyContent: 'flex-end' }

// Equal width columns
{ flexDirection: 'row' }
  <View style={{ flex: 1 }} />  {/* 50% width */}
  <View style={{ flex: 1 }} />  {/* 50% width */}
```

### Responsive Design Tips

1. **Use Percentages:**
   ```javascript
   width: '100%'   // Full width
   width: '50%'    // Half width
   ```

2. **Use flex for proportions:**
   ```javascript
   <View style={{ flex: 2 }} />  {/* 2/3 of space */}
   <View style={{ flex: 1 }} />  {/* 1/3 of space */}
   ```

3. **Use Dimensions API:**
   ```javascript
   import { Dimensions } from 'react-native';
   const { width, height } = Dimensions.get('window');
   
   <View style={{ width: width * 0.8 }} />  {/* 80% of screen width */}
   ```

---

## SECTION 9: DEBUGGING FOR BEGINNERS

### Common Issues & Solutions

#### Issue 1: Component Not Showing
**Symptoms:** Blank screen, component doesn't appear

**Checklist:**
1. ✅ Is component properly exported?
   ```javascript
   export default MyComponent;  // ✅ Good
   export MyComponent;          // ✅ Also good
   MyComponent;                 // ❌ Missing export!
   ```

2. ✅ Is component properly imported?
   ```javascript
   import MyComponent from './MyComponent';     // ✅ Default export
   import { MyComponent } from './MyComponent'; // ✅ Named export
   import MyComponent from './WrongName';       // ❌ Wrong file!
   ```

3. ✅ Does component return JSX?
   ```javascript
   function MyComponent() {
     return <View><Text>Hello</Text></View>;  // ✅ Good
   }
   
   function MyComponent() {
     <View><Text>Hello</Text></View>;  // ❌ Missing return!
   }
   ```

4. ✅ Is component used in JSX?
   ```javascript
   <MyComponent />   // ✅ Good
   {MyComponent}     // ❌ Missing JSX brackets!
   MyComponent()     // ❌ Don't call directly!
   ```

#### Issue 2: Style Not Applying
**Symptoms:** Component visible but looks wrong

**Checklist:**
1. ✅ Check style name spelling
   ```javascript
   backgroundColor: 'red'  // ✅ Correct (camelCase)
   background-color: 'red' // ❌ Wrong (kebab-case doesn't work)
   ```

2. ✅ Verify StyleSheet is imported
   ```javascript
   import { StyleSheet } from 'react-native';  // ✅ Required!
   ```

3. ✅ Check style syntax
   ```javascript
   style={styles.container}      // ✅ Single style
   style={[styles.a, styles.b]}  // ✅ Multiple styles (array)
   style={{backgroundColor: 'red'}}  // ✅ Inline style (double braces)
   style={styles.container, styles.text}  // ❌ Wrong syntax!
   ```

4. ✅ Verify style is defined
   ```javascript
   const styles = StyleSheet.create({
     container: { backgroundColor: 'red' }  // ✅ Defined
   });
   
   <View style={styles.containr} />  // ❌ Typo! Should be 'container'
   ```

#### Issue 3: State Not Updating
**Symptoms:** Click button, nothing happens

**Checklist:**
1. ✅ Always use setState function
   ```javascript
   const [count, setCount] = useState(0);
   
   setCount(count + 1);  // ✅ Correct
   count = count + 1;    // ❌ NEVER modify directly!
   ```

2. ✅ State updates are asynchronous
   ```javascript
   setCount(count + 1);
   console.log(count);  // ❌ Still shows old value!
   
   // ✅ Use useEffect to react to state changes
   useEffect(() => {
     console.log(count);  // ✅ Shows new value
   }, [count]);
   ```

3. ✅ Object/array state needs new reference
   ```javascript
   // ❌ BAD: Mutating array
   const [items, setItems] = useState([1, 2, 3]);
   items.push(4);  // React won't detect change!
   
   // ✅ GOOD: New array
   setItems([...items, 4]);  // React detects change!
   ```

### Debugging Tools

#### 1. Console Logs (Your Best Friend!)
```javascript
console.log('Component rendered');
console.log('Props:', props);
console.log('State:', state);
console.error('This is an error');
console.warn('This is a warning');
```

#### 2. React DevTools
- Install React DevTools browser extension
- Inspect component tree
- View props and state
- Track component renders

#### 3. Expo Developer Menu
- Shake device (or Ctrl+M / Cmd+D)
- Options:
  - Reload: Restart app
  - Debug Remote JS: Use Chrome DevTools
  - Show Performance Monitor: FPS, memory usage
  - Toggle Inspector: Tap elements to inspect

#### 4. Network Debugging
```javascript
// Log all fetch requests
const originalFetch = fetch;
fetch = async (...args) => {
  console.log('Fetching:', args[0]);
  const response = await originalFetch(...args);
  console.log('Response:', response.status);
  return response;
};
```

---

## SECTION 10: STEP-BY-STEP BUILDING BLOCKS

### How We Built NearYouNews (Chronological Order)

#### Phase 1: Foundation Setup
1. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   expo init nearyounews
   ```

2. **Create basic App.js**
   ```javascript
   export default function App() {
     return (
       <View>
         <Text>Hello World</Text>
       </View>
     );
   }
   ```

3. **Test on phone/simulator**
   - Scan QR code with Expo Go app
   - Verify "Hello World" appears

#### Phase 2: Navigation Setup
4. **Install navigation libraries**
   ```bash
   npm install @react-navigation/native
   npm install @react-navigation/bottom-tabs
   npm install react-native-screens react-native-safe-area-context
   ```

5. **Create basic screens**
   - screens/HomeScreen.js
   - screens/LocationScreen.js
   - screens/AddNewsScreen.js

6. **Set up Tab Navigator in App.js**
   - Three tabs: Home, Add News, Location
   - Test navigation works

#### Phase 3: Location Services
7. **Install expo-location**
   ```bash
   expo install expo-location
   ```

8. **Create location service**
   - services/location.js
   - Request permissions
   - Get GPS coordinates

9. **Create LocationPermission component**
   - Custom permission modal
   - Save preference in AsyncStorage

10. **Create LocationSender component**
    - Auto-update every 2 minutes
    - Manual refresh button

#### Phase 4: Backend Integration
11. **Create API service**
    - services/api.js
    - sendLocationToBackend function

12. **Create news service**
    - services/news.js
    - fetchNearbyNews function
    - createNews function

13. **Create config.js**
    - Central place for API URL
    - Environment variables

#### Phase 5: News Feed UI
14. **Create NewsFeed component**
    - FlatList for scrolling
    - News cards
    - Pull-to-refresh

15. **Add filtering**
    - Filter modal
    - Radius options (1km-50km)
    - Sort by distance/time

16. **Improve filter UX**
    - Temporary state pattern
    - Only apply on button click

#### Phase 6: Post News Feature
17. **Build AddNewsScreen**
    - Text input
    - Character counter (500 max)
    - Post button

18. **Integrate with backend**
    - Call createNews API
    - Handle success/errors
    - Navigate to Home after posting

#### Phase 7: Theming
19. **Create ThemeContext**
    - Dark/light mode
    - Color definitions

20. **Wrap App in ThemeProvider**
    - All components can access theme

21. **Update components to use theme**
    - NewsFeed, AddNewsScreen, etc.
    - Tab bar styling

22. **Add theme toggle**
    - Tap title to toggle
    - Sun/moon icon indicator

#### Phase 8: Polish
23. **Add professional icons**
    - Replace emojis with Ionicons
    - Consistent icon sizing

24. **Improve spacing**
    - Status bar padding
    - Consistent margins/padding

25. **Error handling**
    - Loading states
    - Error messages
    - Empty states

26. **Create documentation**
    - DOCUMENTATION.md (this file!)
    - README.md
    - .env.example files

---

## SECTION 11: INTERACTIVE LEARNING EXERCISES

### Exercise 1: Change Colors (Beginner)
**Goal:** Learn about styling and themes

**Task:**
1. Open `context/ThemeContext.js`
2. Change the dark mode background color from `"#121212"` to `"#1a1a2e"`
3. Change the primary blue color from `"#2196F3"` to `"#00adb5"`

**Expected Result:** Dark mode now has a blue-ish tint

**Learning:** How themes work, where colors are defined

---

### Exercise 2: Add a New Screen (Intermediate)
**Goal:** Understand navigation and components

**Task:**
1. Create `screens/ProfileScreen.js`:
   ```javascript
   export default function ProfileScreen() {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Profile Screen</Text>
       </View>
     );
   }
   ```

2. In `App.js`, import and add as 4th tab:
   ```javascript
   import ProfileScreen from "./screens/ProfileScreen";
   
   <Tab.Screen 
     name="Profile" 
     component={ProfileScreen}
     options={{
       tabBarLabel: "Profile",
       tabBarIcon: ({ color, size }) => (
         <Ionicons name="person" size={size} color={color} />
       ),
     }}
   />
   ```

**Expected Result:** New "Profile" tab appears in bottom navigation

**Learning:** How to add new screens, navigation structure

---

### Exercise 3: Create a Card Component (Intermediate)
**Goal:** Learn about reusable components and props

**Task:**
1. Create `components/Card.js`:
   ```javascript
   import { View, StyleSheet } from 'react-native';
   import { useTheme } from '../context/ThemeContext';
   
   export default function Card({ children, style }) {
     const { theme } = useTheme();
     
     return (
       <View style={[
         styles.card,
         { backgroundColor: theme.card, borderColor: theme.border },
         style
       ]}>
         {children}
       </View>
     );
   }
   
   const styles = StyleSheet.create({
     card: {
       borderRadius: 12,
       padding: 16,
       borderWidth: 1,
       marginBottom: 12,
       shadowColor: "#000",
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.1,
       shadowRadius: 4,
       elevation: 3,
     },
   });
   ```

2. Use it in NewsFeed.js:
   ```javascript
   import Card from './Card';
   
   const renderNewsItem = ({ item }) => (
     <Card>
       <Text style={[styles.newsContent, { color: theme.text }]}>
         {item.content}
       </Text>
       {/* ...rest of content... */}
     </Card>
   );
   ```

**Expected Result:** News items look the same, but now use reusable Card component

**Learning:** Component composition, children props, style merging

---

### Exercise 4: Add Loading Spinner (Intermediate)
**Goal:** Understand conditional rendering and state

**Task:**
1. In `AddNewsScreen.js`, add loading state:
   ```javascript
   const [posting, setPosting] = useState(false);
   
   const handlePost = async () => {
     setPosting(true);
     // ...existing post logic...
     setPosting(false);
   };
   ```

2. Update Post button:
   ```javascript
   <TouchableOpacity 
     style={[styles.postButton, posting && { opacity: 0.5 }]}
     onPress={handlePost}
     disabled={posting}
   >
     {posting ? (
       <ActivityIndicator color="#fff" />
     ) : (
       <Text style={styles.postButtonText}>Post</Text>
     )}
   </TouchableOpacity>
   ```

**Expected Result:** Button shows spinner while posting, then text when done

**Learning:** State management, conditional rendering, disabled buttons

---

### Exercise 5: Add Filter Count Badge (Advanced)
**Goal:** Learn about derived state and dynamic UI

**Task:**
1. In `NewsFeed.js`, calculate active filters:
   ```javascript
   const activeFilterCount = () => {
     let count = 0;
     if (radius !== 5000) count++;  // Default is 5km
     if (sort !== "distance") count++;  // Default is distance
     return count;
   };
   ```

2. Add badge to filter icon:
   ```javascript
   <TouchableOpacity style={styles.filterIcon} onPress={...}>
     <Ionicons name="funnel-outline" size={22} color="#2196F3" />
     {activeFilterCount() > 0 && (
       <View style={styles.badge}>
         <Text style={styles.badgeText}>{activeFilterCount()}</Text>
       </View>
     )}
   </TouchableOpacity>
   ```

3. Add badge styles:
   ```javascript
   badge: {
     position: 'absolute',
     top: -5,
     right: -5,
     backgroundColor: '#f44336',
     borderRadius: 10,
     width: 20,
     height: 20,
     justifyContent: 'center',
     alignItems: 'center',
   },
   badgeText: {
     color: '#fff',
     fontSize: 12,
     fontWeight: 'bold',
   },
   ```

**Expected Result:** Red circle with number appears on filter icon when filters are active

**Learning:** Derived state, conditional rendering, absolute positioning

---

## SECTION 12: GLOSSARY OF TERMS

**API (Application Programming Interface):** A way for apps to talk to servers. Like a waiter taking your order to the kitchen.

**Async/Await:** Keywords for handling asynchronous code (code that takes time, like network requests).

**Component:** A reusable piece of UI. Like a Lego block.

**Context:** A way to share data across the entire app without passing props through every level.

**Destructuring:** Extracting values from objects/arrays. `const { name } = user;` instead of `const name = user.name;`

**FlatList:** An efficient scrolling list component that only renders visible items.

**Flexbox:** A layout system for arranging components. The main way to position things in React Native.

**Hook:** A special function that lets you use React features. Always starts with `use` (useState, useEffect, useContext).

**JSX:** HTML-like syntax inside JavaScript. `<View>` instead of `React.createElement(View)`.

**Modal:** A popup overlay that appears on top of content.

**Navigator:** Manages screen transitions and history (going back/forward).

**Props (Properties):** Data passed FROM parent TO child component. Immutable (can't be changed by child).

**Promise:** Represents a value that will be available in the future (like a pizza delivery receipt).

**Render:** The process of turning React components into UI on the screen.

**State:** Data that a component remembers and can change. When state changes, component re-renders.

**StyleSheet:** React Native's way of defining styles. Like CSS for mobile.

**TouchableOpacity:** A tappable component that fades when pressed.

**URI (Uniform Resource Identifier):** A unique address for a resource (like a file path or URL).

---

## SECTION 13: PROJECT-SPECIFIC FEATURES

### Feature 1: Two-Minute Auto-Update
**What:** App sends location to server every 2 minutes automatically

**Why:** Keeps your location fresh so news feed shows relevant posts

**How It Works:**
```javascript
// LocationSender.js
useEffect(() => {
  const interval = setInterval(() => {
    fetchAndSendLocation();
  }, UPDATE_INTERVAL);  // 120000ms = 2 minutes
  
  return () => clearInterval(interval);  // Cleanup on unmount
}, []);
```

**User Control:** Pause/Resume button to control auto-updates

---

### Feature 2: Temporary Filter State
**What:** Filters don't apply until you click "Apply Filters"

**Why:** UX improvement - lets you adjust multiple settings without reloading news each time

**How It Works:**
```javascript
// Two sets of state:
const [radius, setRadius] = useState(5000);        // Real value
const [tempRadius, setTempRadius] = useState(5000); // Temporary value

// User adjusts tempRadius in modal
// Only when "Apply" clicked:
setRadius(tempRadius);  // Apply the temp value
```

**Benefit:** Better performance, less API calls, smoother UX

---

### Feature 3: Intelligent Permission Management
**What:** Three permission options: Always, This Time Only, Deny

**Why:** Better user control than standard iOS/Android permissions

**How It Works:**
```javascript
// Save preference in AsyncStorage
await AsyncStorage.setItem(PERMISSION_KEY, "always");

// Next time app opens, check saved preference
const savedPreference = await AsyncStorage.getItem(PERMISSION_KEY);
if (savedPreference === "always") {
  // Skip modal, directly get location
}
```

**Benefit:** Less annoying popups for returning users

---

### Feature 4: Theme Toggle on Title Tap
**What:** Tap "NearYouNews" to switch dark/light mode

**Why:** Hidden power user feature, doesn't clutter UI with theme button

**How It Works:**
```javascript
<TouchableOpacity onPress={toggleTheme}>
  <Text>NearYouNews</Text>
  <Ionicons name={isDarkMode ? "sunny" : "moon"} />
</TouchableOpacity>
```

**Benefit:** Clean UI, discoverable feature

---

## SECTION 14: NEXT LEARNING STEPS

### After Understanding This Codebase, Learn:

#### 1. Advanced State Management
**What:** Redux, MobX, or Zustand for complex apps

**When Needed:** When prop drilling gets crazy (passing props through 10+ levels)

**Resources:**
- Redux Toolkit documentation
- Kent C. Dodds "Application State Management" article

---

#### 2. Native Device Features
**What:** Camera, push notifications, biometrics

**Libraries:**
- expo-camera
- expo-notifications
- expo-local-authentication

**Example:**
```javascript
import * as Camera from 'expo-camera';
const { status } = await Camera.requestCameraPermissionsAsync();
```

---

#### 3. Performance Optimization
**What:** Make your app faster and smoother

**Topics:**
- useMemo and useCallback hooks
- React.memo for component memoization
- FlatList optimization (getItemLayout)
- Image optimization (FastImage library)

**Example:**
```javascript
const expensiveCalculation = useMemo(() => {
  return items.filter(item => item.active).length;
}, [items]);  // Only recalculate when items change
```

---

#### 4. Testing React Native Apps
**What:** Write automated tests

**Tools:**
- Jest (unit tests)
- React Native Testing Library
- Detox (end-to-end tests)

**Example:**
```javascript
import { render, fireEvent } from '@testing-library/react-native';

test('button increments counter', () => {
  const { getByText } = render(<Counter />);
  const button = getByText('Increment');
  fireEvent.press(button);
  expect(getByText('Count: 1')).toBeTruthy();
});
```

---

#### 5. Publishing to App Stores
**What:** Get your app on App Store and Google Play

**Steps:**
1. Build production app (EAS Build)
2. Create developer accounts ($99/year iOS, $25 one-time Android)
3. Prepare assets (icons, screenshots, description)
4. Submit for review
5. Handle rejections and iterate

**Resources:**
- Expo Application Services (EAS)
- Apple App Store Connect
- Google Play Console

---

#### 6. Advanced React Native Concepts
**Topics to Explore:**
- Native modules (bridging native code)
- Animations (Reanimated library)
- Gestures (Gesture Handler)
- Deep linking (URL schemes)
- Code push (instant updates without app store)

**Example - Animation:**
```javascript
import Animated from 'react-native-reanimated';

const fadeAnim = new Animated.Value(0);

Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 500,
}).start();
```

---

## SECTION 15: COMMON PITFALLS & HOW TO AVOID THEM

### Pitfall 1: Modifying State Directly
```javascript
// ❌ BAD
const [user, setUser] = useState({ name: 'John', age: 25 });
user.age = 26;  // React won't detect this change!

// ✅ GOOD
setUser({ ...user, age: 26 });  // Create new object
```

**Why:** React compares object references, not values. Same object = no re-render.

---

### Pitfall 2: Missing useEffect Dependencies
```javascript
// ❌ BAD
useEffect(() => {
  fetchData(userId);  // Uses userId but doesn't list it in dependencies
}, []);

// ✅ GOOD
useEffect(() => {
  fetchData(userId);
}, [userId]);  // Now updates when userId changes
```

**Why:** Missing dependencies cause stale closures and bugs.

---

### Pitfall 3: Infinite useEffect Loops
```javascript
// ❌ BAD
useEffect(() => {
  setCount(count + 1);  // This causes infinite loop!
}, [count]);  // Triggers whenever count changes

// ✅ GOOD
useEffect(() => {
  // Only run once on mount
  fetchData();
}, []);  // Empty array = run once
```

**Why:** Updating a dependency inside useEffect triggers it again.

---

### Pitfall 4: Not Cleaning Up Effects
```javascript
// ❌ BAD
useEffect(() => {
  const interval = setInterval(() => {...}, 1000);
  // Interval keeps running even after component unmounts!
}, []);

// ✅ GOOD
useEffect(() => {
  const interval = setInterval(() => {...}, 1000);
  return () => clearInterval(interval);  // Cleanup!
}, []);
```

**Why:** Prevents memory leaks and crashes.

---

### Pitfall 5: Forgetting Key Props in Lists
```javascript
// ❌ BAD
{items.map(item => <View><Text>{item.name}</Text></View>)}

// ✅ GOOD
{items.map(item => (
  <View key={item.id}>  {/* Unique key for each item */}
    <Text>{item.name}</Text>
  </View>
))}
```

**Why:** Keys help React identify which items changed, preventing bugs.

---

## FINAL THOUGHTS

You've now learned:
- ✅ React Native fundamentals
- ✅ Component architecture
- ✅ Navigation
- ✅ State management
- ✅ API integration
- ✅ Styling and theming
- ✅ Real-world patterns

**Next Steps:**
1. Experiment with the code (break things, fix them!)
2. Try the exercises above
3. Build a small feature on your own
4. Read official React Native docs
5. Join React Native communities (Reddit, Discord)

**Remember:**
- Every expert was once a beginner
- Google/StackOverflow are your friends
- Reading error messages carefully saves time
- Console.log() is debugging gold
- Breaking things is how you learn!

---

## CHECK YOUR UNDERSTANDING

### Quiz 1: Basics
1. What's the difference between props and state?
2. When should you use FlatList vs ScrollView?
3. What does the `key` prop do in lists?

<details>
<summary>Answers</summary>

1. Props = data passed TO component (immutable). State = data WITHIN component (mutable).
2. FlatList = long lists (only renders visible items). ScrollView = short lists (renders everything).
3. Keys help React identify which items changed for efficient updates.

</details>

### Quiz 2: This Project
1. How often does LocationSender update location?
2. Where are theme colors defined?
3. What happens when you tap "NearYouNews"?

<details>
<summary>Answers</summary>

1. Every 2 minutes (120,000 milliseconds)
2. context/ThemeContext.js
3. Toggles between dark and light mode

</details>

---

**Congratulations!** You now have a comprehensive understanding of this React Native project and the fundamentals to build your own apps. Keep coding! 🚀
