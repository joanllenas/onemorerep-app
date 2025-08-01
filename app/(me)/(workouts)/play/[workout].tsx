import WorkoutPlayer from '@/components/player/WorkoutPlayer';
import { flattenWorkoutElements, sanitizeVideoUrls } from '@/components/player/utils';
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

  React.useEffect(() => {
    fetchWorkouts()
      .then((data) => {
        const wk = data.find((item) => item.id === workoutId);
        if (!wk) {
          throw new Error(`Workout ${workoutId} not found.`);
        }
        setWorkout({ ...wk, elements: sanitizeVideoUrls(flattenWorkoutElements(wk.elements)) });
        setLoading(false);
      })
      .catch((error) => {
        alert('Failed to fetch workouts.');
        console.error('Failed to fetch workouts:', error);
      });
  }, [workoutId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={18} color={Palette.textPrimary} />
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text style={{ color: Palette.danger }}>Workout {workoutId} could not be found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WorkoutPlayer workout={workout} />
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
});
