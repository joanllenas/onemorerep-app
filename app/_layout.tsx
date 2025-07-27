import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { Stack } from 'expo-router';

const IniatalLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Stack>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <IniatalLayout />
    </AuthProvider>
  );
}
