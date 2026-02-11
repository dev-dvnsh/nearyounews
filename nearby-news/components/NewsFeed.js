import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, Modal, Image } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { fetchNearbyNews } from "../services/news";
import { useTheme } from "../context/ThemeContext";

export default function NewsFeed({ location }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(5000);
  const [sort, setSort] = useState("distance");
  const [showFilters, setShowFilters] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  
  // Temporary filter values for modal
  const [tempRadius, setTempRadius] = useState(5000);
  const [tempSort, setTempSort] = useState("distance");

  const { isDarkMode, theme, toggleTheme } = useTheme();

  const radiusOptions = [
    { label: "1km", value: 1000 },
    { label: "5km", value: 5000 },
    { label: "10km", value: 10000 },
    { label: "20km", value: 20000 },
    { label: "50km", value: 50000 },
  ];

  useEffect(() => {
    if (location) {
      loadNews();
    }
  }, [location, radius, sort]);

  const loadNews = async () => {
    if (!location) return;
    setLoading(true);
    setError(null);

    const result = await fetchNearbyNews({
      latitude: location.latitude,
      longitude: location.longitude,
      radius,
      sort,
    });

    if (result.success) {
      setNews(result.data);
    } else {
      setError(result.error || "Failed to load news");
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  const formatDistance = (distanceKm) => {
    if (distanceKm < 1) return `${Math.round(distanceKm * 1000)}m away`;
    return `${distanceKm.toFixed(1)}km away`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const renderNewsItem = ({ item }) => (
    <View style={[styles.newsCard, { backgroundColor: theme.card }]}>
      {Array.isArray(item.newsImageUrl) && item.newsImageUrl.length > 0 && (
        <TouchableOpacity onPress={() => setFullscreenImage(item.newsImageUrl[0])} activeOpacity={0.9}>
          <Image
            source={{ uri: item.newsImageUrl[0] }}
            style={styles.newsImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={[styles.newsContent, { color: theme.text }]}>{item.content}</Text>
      <View style={[styles.newsFooter, { borderTopColor: theme.border }]}>
        <View style={styles.metaItem}>
          <Ionicons name="location" size={14} color={theme.subtext} />
          <Text style={[styles.distance, { color: theme.subtext }]}>{formatDistance(item.distanceKm)}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time" size={14} color={theme.subtext} />
          <Text style={[styles.time, { color: theme.subtext }]}>{formatTime(item.createdAt)}</Text>
        </View>
      </View>
    </View>
  );

  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.infoText}>Waiting for location...</Text>
      </View>
    );
  }

  if (loading && !refreshing) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={[styles.loadingText, { color: theme.subtext }]}>Loading nearby news...</Text>
      </View>
    );
  }

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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={toggleTheme}>
          <View style={styles.titleContainer}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>NearYouNews</Text>
            <Ionicons 
              name={isDarkMode ? "sunny" : "moon"} 
              size={16} 
              color={isDarkMode ? "#FFA500" : "#666"} 
              style={styles.themeIcon}
            />
          </View>
          <Text style={[styles.headerSubtitle, { color: theme.subtext }]}>{news.length} items</Text>
        </TouchableOpacity>
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

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.modalBg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={[styles.closeButton, { color: theme.subtext }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.text }]}>Radius:</Text>
              <View style={styles.filterButtons}>
                {radiusOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[styles.filterButton, tempRadius === option.value && styles.filterButtonActive]}
                    onPress={() => setTempRadius(option.value)}
                  >
                    <Text style={[styles.filterButtonText, tempRadius === option.value && styles.filterButtonTextActive]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.text }]}>Sort by:</Text>
              <View style={styles.filterButtons}>
                {[
                  { key: "distance", icon: "location", label: "Distance" },
                  { key: "time", icon: "time", label: "Recent" }
                ].map((sortOption) => (
                  <TouchableOpacity
                    key={sortOption.key}
                    style={[styles.filterButton, tempSort === sortOption.key && styles.filterButtonActive]}
                    onPress={() => setTempSort(sortOption.key)}
                  >
                    <View style={styles.filterButtonContent}>
                      <Ionicons 
                        name={sortOption.icon} 
                        size={16} 
                        color={tempSort === sortOption.key ? "#fff" : "#666"}
                      />
                      <Text style={[styles.filterButtonText, tempSort === sortOption.key && styles.filterButtonTextActive]}>
                        {sortOption.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={() => {
                setRadius(tempRadius);
                setSort(tempSort);
                setShowFilters(false);
              }}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {news.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="newspaper-outline" size={64} color={theme.subtext} />
          <Text style={[styles.emptyText, { color: theme.subtext }]}>No news nearby</Text>
          <Text style={[styles.emptySubtext, { color: theme.subtext }]}>Be the first to post something in this area!</Text>
        </View>
      ) : (
        <FlatList
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => item._id || `news-${index}`}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#2196F3"]} />}
        />
      )}

      {/* Fullscreen Image Modal */}
      <Modal
        visible={fullscreenImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFullscreenImage(null)}
      >
        <View style={styles.fullscreenModal}>
          <TouchableOpacity 
            style={styles.fullscreenClose} 
            onPress={() => setFullscreenImage(null)}
          >
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          <Image 
            source={{ uri: fullscreenImage }} 
            style={styles.fullscreenImage} 
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  header: { 
    backgroundColor: "#fff", 
    padding: 16, 
    paddingTop: 30,
    borderBottomWidth: 1, 
    borderBottomColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  themeIcon: { marginLeft: 8 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  headerSubtitle: { fontSize: 12, color: "#666", marginTop: 4 },
  filterIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center" },
  filterIconText: { fontSize: 20 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: "70%" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#333" },
  closeButton: { fontSize: 28, color: "#666", fontWeight: "300" },
  filterSection: { marginBottom: 24 },
  filterLabel: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 12 },
  filterButtons: { flexDirection: "row", flexWrap: "wrap" },
  filterButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: "#f5f5f5", borderWidth: 1, borderColor: "#e0e0e0", marginRight: 8, marginBottom: 8 },
  filterButtonActive: { backgroundColor: "#2196F3", borderColor: "#2196F3" },
  filterButtonText: { fontSize: 14, color: "#666", fontWeight: "500" },
  filterButtonTextActive: { color: "#fff" },
  applyButton: { backgroundColor: "#2196F3", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 8 },
  applyButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  listContent: { padding: 16 },
  newsCard: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  newsImage: { width: "100%", height: 300, borderRadius: 10, marginBottom: 12, backgroundColor: "#ddd" },
  newsContent: { fontSize: 16, color: "#333", lineHeight: 24, marginBottom: 12 },
  newsFooter: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#f0f0f0", paddingTop: 8 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  distance: { fontSize: 12, color: "#666", marginLeft: 4 },
  time: { fontSize: 12, color: "#999", marginLeft: 4 },
  filterButtonContent: { flexDirection: "row", alignItems: "center", gap: 6 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  emptyText: { fontSize: 18, color: "#666", marginTop: 16, marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: "#999", textAlign: "center" },
  loadingText: { marginTop: 16, fontSize: 14, color: "#666" },
  errorText: { fontSize: 16, color: "#f44336", marginBottom: 16, textAlign: "center" },
  retryButton: { backgroundColor: "#2196F3", paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8 },
  retryButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  infoText: { fontSize: 14, color: "#666" },
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
});
