import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffd33d',
          headerStyle: {
            backgroundColor: '#25292e',
          },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#25292e',
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
          name="dashboard"
          options={{
            headerTitle: 'Dashboard',
            title: 'Dashboard',
            tabBarIcon: ({ focused, color }) => (
              <Ionicons size={20} name={focused ? 'diamond-sharp' : 'diamond-outline'} color={color} />
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
