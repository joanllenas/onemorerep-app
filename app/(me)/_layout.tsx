import { Palette } from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Palette.accent,
          headerStyle: {
            backgroundColor: Palette.background,
          },
          headerShadowVisible: false,
          headerTintColor: Palette.textPrimary,
          tabBarStyle: {
            backgroundColor: Palette.background,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: 'Home',
            title: 'Home',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons size={20} name={focused ? 'home-sharp' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(workouts)"
          options={{
            headerShown: false,
            title: 'Workouts',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons size={20} name={focused ? 'flash-sharp' : 'flash-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: 'Profile',
            title: 'Profile',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons size={20} name={focused ? 'person-sharp' : 'person-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
