import { IconSymbol } from '@/components/IconSymbol';
import { Color } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { Workout } from '@/model/workout.types';
import { fetchWorkouts } from '@/utils/dummy-data';
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
        <ActivityIndicator size={18} color={Color.Text} />
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
            backgroundColor: Color.Surface,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ItemTitleAndDescription
            title={item.title}
            description={item.description}
            isPrivate={item.title.includes('a')}
          />
          <IconSymbol name="chevron.right" size={20} color={Color.TextMuted} />
        </View>
      )}
      ListEmptyComponent={<Text style={styles.text}>No workouts found.</Text>}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
}

function ItemTitleAndDescription({
  title,
  description,
  isPrivate,
}: {
  title: string;
  description?: string;
  isPrivate: boolean;
}) {
  return (
    <View style={{ gap: Size.Gap.Small }}>
      <ItemTitle title={title} isPrivate={isPrivate} />
      {description && <Text style={{ fontSize: 13, color: Color.TextMuted }}>{description}</Text>}
    </View>
  );
}

function ItemTitle({ title, isPrivate }: { title: string; isPrivate: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Size.Gap.Medium }}>
      <Text style={{ fontSize: Size.Text.Large, color: Color.Text }}>{title}</Text>
      {isPrivate && <IconSymbol name="lock.fill" size={20} color="#666666" />}
    </View>
  );
}

const styles = StyleSheet.create({
  containerBase: {
    backgroundColor: Color.Background,
    padding: Size.Padding.Screen,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Color.Text,
  },
});
