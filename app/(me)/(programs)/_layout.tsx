import IconButton from '@/components/IconButton';
import { Color } from '@/utils/color';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ProgramsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: Color.Text,
        headerStyle: {
          backgroundColor: Color.Background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerRight: (props) => <IconButton icon="add" label="" href="/create-program" color={Color.Primary} />,
          headerTitle: 'Programs',
        }}
      />
      <Stack.Screen name="create-program" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
