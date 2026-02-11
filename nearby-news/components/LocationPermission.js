import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentLocation, requestSystemPermission } from "../services/location";
import { useTheme } from "../context/ThemeContext";

const PERMISSION_KEY = "@location_permission_preference";

export default function LocationPermission({ children }) {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    checkPermissionAndFetchLocation();
  }, []);

  const checkPermissionAndFetchLocation = async () => {
    try {
      // Check if user previously selected "Allow Always"
      const savedPreference = await AsyncStorage.getItem(PERMISSION_KEY);

      if (savedPreference === "always") {
        // User allowed always, directly fetch location
        await fetchLocation();
      } else {
        // Show permission modal
        setShowPermissionModal(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error checking permission:", error);
      setIsLoading(false);
    }
  };

  const fetchLocation = async () => {
    // Request system permission
    const hasPermission = await requestSystemPermission();

    if (!hasPermission) {
      setErrorMsg("Permission to access location was denied");
      setIsLoading(false);
      return;
    }

    // Get location
    const currentLocation = await getCurrentLocation();

    if (!currentLocation) {
      setErrorMsg("Failed to fetch location");
      setIsLoading(false);
      return;
    }

    setLocation(currentLocation);
    setIsLoading(false);
  };

  const handleAllowAlways = async () => {
    // Save preference
    await AsyncStorage.setItem(PERMISSION_KEY, "always");
    setShowPermissionModal(false);
    await fetchLocation();
  };

  const handleAllowOnce = async () => {
    // Don't save preference - will ask again next time
    setShowPermissionModal(false);
    await fetchLocation();
  };

  const handleDeny = () => {
    setShowPermissionModal(false);
    setErrorMsg("Location permission denied by user");
    setIsLoading(false);
  };

  // Render children with location data passed as props
  if (children && typeof children === "function") {
    return (
      <>
        {/* Permission Modal */}
        <Modal
          visible={showPermissionModal}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.modalBg }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Location Permission</Text>
              <Text style={[styles.modalDescription, { color: theme.subtext }]}>
                This app needs access to your location to show nearby news.
              </Text>

              <TouchableOpacity
                style={[styles.button, styles.buttonAlways]}
                onPress={handleAllowAlways}
              >
                <Text style={styles.buttonText}>Allow Always</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonOnce]}
                onPress={handleAllowOnce}
              >
                <Text style={styles.buttonText}>Allow This Time Only</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonDeny, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={handleDeny}
              >
                <Text style={[styles.buttonTextDeny, { color: theme.subtext }]}>Deny</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {children({ location, errorMsg, isLoading, showPermissionModal })}
      </>
    );
  }

  // Default UI if no children provided
  return (
    <View style={styles.container}>
      {/* Permission Modal */}
      <Modal
        visible={showPermissionModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location Permission</Text>
            <Text style={styles.modalDescription}>
              This app needs access to your location to show nearby news.
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.buttonAlways]}
              onPress={handleAllowAlways}
            >
              <Text style={styles.buttonText}>Allow Always</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonOnce]}
              onPress={handleAllowOnce}
            >
              <Text style={styles.buttonText}>Allow This Time Only</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonDeny]}
              onPress={handleDeny}
            >
              <Text style={styles.buttonTextDeny}>Deny</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Location Display */}
      <Text style={styles.title}>Live Location</Text>

      {isLoading && !showPermissionModal && (
        <Text>Fetching location...</Text>
      )}

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {location && (
        <>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    padding: 30,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonAlways: {
    backgroundColor: "#4CAF50",
  },
  buttonOnce: {
    backgroundColor: "#2196F3",
  },
  buttonDeny: {
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextDeny: {
    fontSize: 16,
    fontWeight: "600",
  },
});
