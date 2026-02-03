import { View, Text, StyleSheet } from "react-native";
import LocationPermission from "../components/LocationPermission";
import LocationSender from "../components/LocationSender";

export default function LocationScreen() {
  return (
    <LocationPermission>
      {({ location, errorMsg, isLoading }) => (
        <View style={styles.container}>
          {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
          {isLoading && <Text>Loading location...</Text>}
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
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    padding: 10,
  },
});
