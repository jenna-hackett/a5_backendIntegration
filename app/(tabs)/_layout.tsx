import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sign-up"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user-plus" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="info-form"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="wpforms" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
