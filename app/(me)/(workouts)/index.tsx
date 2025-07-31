import { Palette } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { Workout } from '@/model/workout.types';
import { fetchWorkouts } from '@/utils/dummy-data';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function WorkoutsScreen() {
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
      <View style={[styles.containerBase, styles.container]}>
        <ActivityIndicator size={18} color={Palette.textPrimary} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.containerBase}
      contentContainerStyle={{ gap: Size.Gap.XLarge }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={true}
      data={workouts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            gap: 6,
            padding: Size.Padding.Medium,
            width: '100%',
            borderRadius: Size.BorderRadius.ListItem,
            backgroundColor: Palette.surface,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ gap: Size.Gap.Small, flex: 1 }}>
            <Text style={{ fontSize: Size.Text.Large, color: Palette.textPrimary }}>{item.title}</Text>
            <Text style={{ fontSize: 13, color: Palette.textMuted }}>{item.description || ''}</Text>
          </View>
          <FontAwesome name="chevron-right" size={20} color={Palette.textMuted} />
        </View>
      )}
      ListEmptyComponent={<Text style={{ color: Palette.textPrimary }}>No workouts found.</Text>}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
}

const styles = StyleSheet.create({
  containerBase: {
    backgroundColor: Palette.background,
    padding: Size.Padding.Screen,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
