import IconButton from '@/components/IconButton';
import { Palette } from '@/constants/color';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function WorkoutsLayout() {
  function createWorkout() {}
  function saveWorkout() {}
  return (
    <Stack
      screenOptions={{
        headerTintColor: Palette.textPrimary,
        headerStyle: {
          backgroundColor: Palette.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerRight: (props) => <IconButton icon="add" label="" href="/create-workout" color={Palette.accent} />,
          headerTitle: 'Workouts',
        }}
      />
      <Stack.Screen
        name="create-workout"
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Create Workout',
          headerLeft: (props) => <IconButton icon="chevron-left" label="" href="/(me)/(workouts)" dismissTo />,
          headerRight: (props) => <IconButton icon="save" label="" onPress={createWorkout} color={Palette.accent} />,
        }}
      />
      <Stack.Screen
        name="[workout]"
        options={{
          presentation: 'modal',
          headerTitle: 'Workout...',
          headerLeft: (props) => <IconButton icon="chevron-left" label="" href="/(me)/(workouts)" dismissTo />,
          headerRight: (props) => <IconButton icon="save" label="" onPress={saveWorkout} color={Palette.accent} />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
