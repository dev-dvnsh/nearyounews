import { View, StyleSheet } from "react-native";
import LocationPermission from "../components/LocationPermission";
import NewsFeed from "../components/NewsFeed";

export default function HomeScreen() {
  return (
    <LocationPermission>
      {({ location }) => (
        <View style={styles.container}>
          <NewsFeed location={location} />
        </View>
      )}
    </LocationPermission>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
