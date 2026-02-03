import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import HomeScreen from "./screens/HomeScreen";
import LocationScreen from "./screens/LocationScreen";
import AddNewsScreen from "./screens/AddNewsScreen";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { theme, isDarkMode } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2196F3",
          tabBarInactiveTintColor: isDarkMode ? "#888" : "#999",
          tabBarStyle: {
            backgroundColor: theme.tabBar,
            borderTopColor: theme.tabBarBorder,
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="AddNews" 
          component={AddNewsScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#2196F3",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}>
                <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>+</Text>
              </View>
            ),
          }}
        />
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

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
