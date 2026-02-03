import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import LocationPermission from "../components/LocationPermission";
import { getCurrentLocation } from "../services/location";
import { createNews } from "../services/news";

export default function AddNewsScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  const handlePost = async (locationData) => {
    if (!content.trim()) {
      Alert.alert("Error", "Please enter some content");
      return;
    }

    if (!locationData || !locationData.latitude || !locationData.longitude) {
      Alert.alert("Error", "Location not available. Please ensure location permissions are granted.");
      return;
    }

    setPosting(true);

    const result = await createNews({
      content: content.trim(),
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    });

    setPosting(false);

    if (result.success) {
      Alert.alert("Success", "News posted successfully!", [
        {
          text: "OK",
          onPress: () => {
            setContent("");
            navigation.navigate("Home");
          },
        },
      ]);
    } else {
      Alert.alert("Error", result.error || "Failed to post news");
    }
  };

  return (
    <LocationPermission>
      {({ location, errorMsg, isLoading }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Post News</Text>
            <Text style={styles.subtitle}>Share what's happening near you</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="What's happening nearby?"
            placeholderTextColor="#999"
            multiline
            numberOfLines={8}
            maxLength={500}
            value={content}
            onChangeText={setContent}
            editable={!posting}
          />

          <View style={styles.footer}>
            <Text style={styles.charCount}>
              {content.length}/500
            </Text>
            
            <TouchableOpacity
              style={[
                styles.postButton,
                (!content.trim() || posting || !location) && styles.postButtonDisabled,
              ]}
              onPress={() => handlePost(location)}
              disabled={!content.trim() || posting || !location}
            >
              {posting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.postButtonText}>Post</Text>
              )}
            </TouchableOpacity>
          </View>

          {isLoading && (
            <Text style={styles.locationWarning}>
              Getting your location...
            </Text>
          )}
          
          {errorMsg && (
            <Text style={[styles.locationWarning, { color: "#f44336" }]}>
              {errorMsg}
            </Text>
          )}
          
          {!location && !isLoading && !errorMsg && (
            <Text style={styles.locationWarning}>
              Location unavailable
            </Text>
          )}
        </KeyboardAvoidingView>
      )}
    </LocationPermission>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  charCount: {
    fontSize: 14,
    color: "#999",
  },
  postButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: "center",
  },
  postButtonDisabled: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  locationWarning: {
    textAlign: "center",
    color: "#ff9800",
    marginTop: 10,
    fontSize: 14,
  },
});
