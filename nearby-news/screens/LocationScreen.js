import { View, Text, StyleSheet } from "react-native";
import LocationPermission from "../components/LocationPermission";
import LocationSender from "../components/LocationSender";
import { useTheme } from "../context/ThemeContext";

export default function LocationScreen() {
  const { theme } = useTheme();
  
  return (
    <LocationPermission>
      {({ location, errorMsg, isLoading }) => (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          {errorMsg && <Text style={[styles.error, { color: theme.text }]}>{errorMsg}</Text>}
          {isLoading && <Text style={{ color: theme.subtext }}>Loading location...</Text>}
          {location && <LocationSender location={location} />}
        </View>
      )}
    </LocationPermission>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    padding: 10,
  },
});
