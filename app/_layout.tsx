import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const IniatalLayout = () => {
  const { checkingInitialUser, loggedInUser } = useAuth();

  if (checkingInitialUser) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={loggedInUser !== null}>
        <Stack.Screen name="(me)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={loggedInUser === null}>
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
