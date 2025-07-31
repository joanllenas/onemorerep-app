import { Palette } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { Workout } from '@/model/workout.types';
import { fetchWorkouts } from '@/utils/dummy-data';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function WorkoutScreen() {
  const { workout: workoutId } = useLocalSearchParams();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkouts()
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        alert('Failed to fetch workouts.');
        console.error('Failed to fetch workouts:', error);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size={18} color={Palette.textPrimary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ gap: 64 }}>
        {workouts.map((item) => {
          return (
            <Text key={item.id} style={{ color: Palette.textPrimary, fontSize: 60 }}>
              Workout page! {workoutId}
            </Text>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    padding: Size.Padding.Screen,
  },
});
