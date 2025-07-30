import IconButton from '@/components/IconButton';
import { Color } from '@/constants/color';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function WorkoutsLayout() {
  function createWorkout() {}
  function saveWorkout() {}
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
          headerRight: (props) => <IconButton icon="add" label="" href="/create-workout" color={Color.Primary} />,
          headerTitle: 'Workouts',
        }}
      />
      <Stack.Screen
        name="create-workout"
        options={{
          presentation: 'modal',
          headerTitle: 'Create Workout',
          headerLeft: (props) => <IconButton icon="chevron-left" label="" href="/(me)/(workouts)" dismissTo />,
          headerRight: (props) => <IconButton icon="save" label="" onPress={createWorkout} color={Color.Primary} />,
        }}
      />
      <Stack.Screen
        name="[workout]"
        options={{
          presentation: 'modal',
          headerTitle: 'Workout...',
          headerLeft: (props) => <IconButton icon="chevron-left" label="" href="/(me)/(workouts)" dismissTo />,
          headerRight: (props) => <IconButton icon="save" label="" onPress={saveWorkout} color={Color.Primary} />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
