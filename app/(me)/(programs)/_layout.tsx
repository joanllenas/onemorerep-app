import IconButton from '@/components/IconButton';
import { Color } from '@/constants/color';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ProgramsLayout() {
  function createProgram() {}
  function saveProgram() {}
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
      <Stack.Screen
        name="create-program"
        options={{
          presentation: 'modal',
          headerTitle: 'Create Program',
          headerLeft: (props) => <IconButton icon="chevron-left" label="" href="/(me)/(programs)" dismissTo />,
          headerRight: (props) => <IconButton icon="save" label="" onPress={createProgram} color={Color.Primary} />,
        }}
      />
      <Stack.Screen
        name="[program]"
        options={{
          presentation: 'modal',
          headerTitle: 'Program...',
          headerLeft: (props) => <IconButton icon="chevron-left" label="" href="/(me)/(programs)" dismissTo />,
          headerRight: (props) => <IconButton icon="save" label="" onPress={saveProgram} color={Color.Primary} />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
