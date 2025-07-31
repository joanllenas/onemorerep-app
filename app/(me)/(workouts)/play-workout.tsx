import { Palette } from '@/constants/color';
import { Workout } from '@/model/workout.types';
import { fetchWorkouts } from '@/utils/dummy-data';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function PlayWorkoutsScreen() {
  const { workout: workoutId } = useLocalSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [workout, setWorkout] = React.useState<Workout | undefined>();
  const [playerStatus, setPlayerStatus] = React.useState<'playing' | 'paused' | 'stopped'>('stopped');
  const [elapsedTime, setElapsedTime] = React.useState(0);

  React.useEffect(() => {
    fetchWorkouts()
      .then((data) => {
        setWorkout(data.find((item) => item.id === workoutId));
        setLoading(false);
      })
      .catch((error) => {
        alert('Failed to fetch workouts.');
        console.error('Failed to fetch workouts:', error);
      });
  }, [workoutId]);

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size={18} color={Palette.textPrimary} />
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
        <Text style={{ color: Palette.danger }}>This workout could not be found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Play Workout!</Text>
    </View>
  );
}

function StartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Start Workout!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Palette.textPrimary,
  },
});
