import IconButton from '@/components/IconButton';
import { Palette } from '@/constants/color';
import { Stack, router } from 'expo-router';

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
          headerRight: () => <IconButton icon="add" label="" href="/create-workout" color={Palette.accent} />,
          headerTitle: 'Workouts',
        }}
      />
      <Stack.Screen
        name="create-workout"
        options={{
          headerTitle: 'Create Workout',
          headerLeft: () => <IconButton icon="chevron-left" label="" href="/(me)/(workouts)" dismissTo />,
          headerRight: () => <IconButton icon="save" label="" onPress={createWorkout} color={Palette.accent} />,
        }}
      />
      <Stack.Screen
        name="detail/[workout]"
        options={{
          headerTitle: '',
          headerLeft: () => <IconButton icon="chevron-left" label="" href="/(me)/(workouts)" dismissTo />,
        }}
      />
      <Stack.Screen
        name="play/[workout]"
        options={{
          presentation: 'fullScreenModal',
          headerTitle: 'Play Workout',
          headerLeft: () => <IconButton icon="chevron-left" label="" onPress={() => router.back()} dismissTo />,
        }}
      />
    </Stack>
  );
}
