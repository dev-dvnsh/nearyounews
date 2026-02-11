import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { sendLocationToBackend } from "../services/api";
import { getCurrentLocation } from "../services/location";
import { useTheme } from "../context/ThemeContext";

const UPDATE_INTERVAL = 2 * 60 * 1000; // 2 minutes in milliseconds

export default function LocationSender({ location: initialLocation }) {
  const [location, setLocation] = useState(initialLocation);
  const [sending, setSending] = useState(false);
  const [lastSent, setLastSent] = useState(null);
  const [error, setError] = useState(null);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const { theme } = useTheme();

  // Auto-send initial location
  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
      handleSendLocation(initialLocation);
    }
  }, [initialLocation]);

  // Set up automatic location updates every 2 minutes
  useEffect(() => {
    if (!autoUpdateEnabled) return;

    const intervalId = setInterval(async () => {
      console.log("Auto-updating location (2 min interval)...");
      await fetchAndSendLocation();
    }, UPDATE_INTERVAL);

    // Cleanup interval on unmount
    return () => {
      console.log("Clearing location update interval");
      clearInterval(intervalId);
    };
  }, [autoUpdateEnabled]);

  const fetchAndSendLocation = async () => {
    try {
      // Fetch fresh location
      const freshLocation = await getCurrentLocation();
      
      if (freshLocation) {
        setLocation(freshLocation);
        await handleSendLocation(freshLocation);
      } else {
        setError("Failed to fetch fresh location");
      }
    } catch (err) {
      console.error("Error in fetchAndSendLocation:", err);
      setError(err.message);
    }
  };

  const handleSendLocation = async (locationToSend = location) => {
    if (!locationToSend) {
      setError("No location data available");
      return;
    }

    setSending(true);
    setError(null);

    const result = await sendLocationToBackend(locationToSend);

    if (result.success) {
      setLastSent(new Date().toLocaleTimeString());
      setError(null);
    } else {
      setError(result.error || "Failed to send location");
    }

    setSending(false);
  };

  const handleManualUpdate = async () => {
    console.log("Manual location update triggered");
    await fetchAndSendLocation();
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={[styles.infoText, { color: theme.subtext }]}>Waiting for location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.locationBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.label, { color: theme.text }]}>Current Location:</Text>
        <Text style={[styles.coords, { color: theme.subtext }]}>Lat: {location.latitude.toFixed(6)}</Text>
        <Text style={[styles.coords, { color: theme.subtext }]}>Lng: {location.longitude.toFixed(6)}</Text>
        
        <View style={[styles.statusRow, { borderTopColor: theme.border }]}>
          <View style={[styles.statusDot, autoUpdateEnabled && styles.statusDotActive]} />
          <Text style={[styles.statusText, { color: theme.subtext }]}>
            Auto-update: {autoUpdateEnabled ? "Active (every 2 min)" : "Paused"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, sending && styles.buttonDisabled]}
        onPress={handleManualUpdate}
        disabled={sending}
      >
        {sending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Update & Send Now</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonSecondary, { backgroundColor: theme.card, borderColor: "#2196F3" }]}
        onPress={() => setAutoUpdateEnabled(!autoUpdateEnabled)}
      >
        <Text style={styles.buttonSecondaryText}>
          {autoUpdateEnabled ? "Pause Auto-Update" : "Resume Auto-Update"}
        </Text>
      </TouchableOpacity>

      {lastSent && (
        <Text style={[styles.successText, { color: theme.text }]}>✓ Last sent at {lastSent}</Text>
      )}

      {error && <Text style={[styles.errorText, { color: theme.text }]}>✗ {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  locationBox: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  coords: {
    fontSize: 14,
    marginVertical: 2,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  successText: {
    marginTop: 15,
    fontSize: 14,
  },
  errorText: {
    marginTop: 15,
    fontSize: 14,
  },
  infoText: {
    fontSize: 14,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: "#4CAF50",
  },
  statusText: {
    fontSize: 12,
  },
  buttonSecondary: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondaryText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "600",
  },
});
