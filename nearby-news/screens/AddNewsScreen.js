import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Image, Modal, ScrollView } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Ionicons } from "@expo/vector-icons";
import LocationPermission from "../components/LocationPermission";
import { getCurrentLocation } from "../services/location";
import { createNews } from "../services/news";
import { useTheme } from "../context/ThemeContext";

export default function AddNewsScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const { theme } = useTheme();

  const compressImage = async (uri) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }], // Resize to max width 1200px
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error("Image compression error:", error);
      return uri; // Return original if compression fails
    }
  };

  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please allow access to your photo library");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1.0,
    });

    if (!result.canceled && result.assets[0]) {
      const compressed = await compressImage(result.assets[0].uri);
      setImageUri(compressed);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please allow access to your camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1.0,
    });

    if (!result.canceled && result.assets[0]) {
      const compressed = await compressImage(result.assets[0].uri);
      setImageUri(compressed);
    }
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const handlePost = async (locationData) => {
    if (!content.trim()) {
      Alert.alert("Error", "Please enter some content");
      return;
    }

    if (!imageUri) {
      Alert.alert("Error", "Please add an image");
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
      imageUri,
    });

    setPosting(false);

    if (result.success) {
      Alert.alert("Success", "News posted successfully!", [
        {
          text: "OK",
          onPress: () => {
            setContent("");
            setImageUri(null);
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
          style={[styles.container, { backgroundColor: theme.background }]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={[styles.title, { color: theme.text }]}>Post News</Text>
              <Text style={[styles.subtitle, { color: theme.subtext }]}>Share what's happening near you</Text>
            </View>

            {/* Image Section */}
            {imageUri ? (
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => setShowFullImage(true)} activeOpacity={0.9}>
                  <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                  <Ionicons name="close-circle" size={28} color="#f44336" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imagePickerContainer}>
                <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: theme.card, borderColor: "#2196F3" }]} onPress={takePhoto}>
                  <Ionicons name="camera" size={32} color="#2196F3" />
                  <Text style={styles.imagePickerText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.imagePickerButton, { backgroundColor: theme.card, borderColor: "#2196F3" }]} onPress={pickImageFromGallery}>
                  <Ionicons name="images" size={32} color="#2196F3" />
                  <Text style={styles.imagePickerText}>Choose from Gallery</Text>
                </TouchableOpacity>
              </View>
            )}

            <TextInput
              style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
              placeholder="What's happening nearby?"
              placeholderTextColor={theme.subtext}
              multiline
              numberOfLines={8}
              maxLength={500}
              value={content}
              onChangeText={setContent}
              editable={!posting}
            />

            <View style={styles.footer}>
              <Text style={[styles.charCount, { color: theme.subtext }]}>
                {content.length}/500
              </Text>
              
              <TouchableOpacity
                style={[
                  styles.postButton,
                  (!content.trim() || !imageUri || posting || !location) && styles.postButtonDisabled,
                ]}
                onPress={() => handlePost(location)}
                disabled={!content.trim() || !imageUri || posting || !location}
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
          </ScrollView>

          {/* Fullscreen Image Modal */}
          <Modal
            visible={showFullImage}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowFullImage(false)}
          >
            <View style={styles.fullscreenModal}>
              <TouchableOpacity 
                style={styles.fullscreenClose} 
                onPress={() => setShowFullImage(false)}
              >
                <Ionicons name="close" size={32} color="#fff" />
              </TouchableOpacity>
              <Image 
                source={{ uri: imageUri }} 
                style={styles.fullscreenImage} 
                resizeMode="contain"
              />
            </View>
          </Modal>
        </KeyboardAvoidingView>
      )}
    </LocationPermission>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 10,
  },
  imagePickerButton: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "#2196F3",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 140,
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "600",
  },
  imageContainer: {
    marginBottom: 20,
    position: "relative",
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 14,
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenClose: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 15,
    minHeight: 120,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  charCount: {
    fontSize: 14,
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
