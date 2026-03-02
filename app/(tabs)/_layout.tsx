import AntDesign from "@expo/vector-icons/AntDesign";

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
        name="info-form"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
