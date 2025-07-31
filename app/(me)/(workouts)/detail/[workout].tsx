import Button from '@/components/Button';
import { Palette } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { Block, Exercise, Rest, Workout, WorkoutElement } from '@/model/workout.types';
import { fetchWorkouts } from '@/utils/dummy-data';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

const surfaceDark = '#2a2f34';

export default function WorkoutDetailScreen() {
  const { workout: workoutId } = useLocalSearchParams();
  const router = useRouter();
  const [workout, setWorkout] = React.useState<Workout | undefined>();
  const [loading, setLoading] = React.useState(true);

  function gotoPlayer() {
    router.push({
      pathname: `/play/[workout]`,
      params: { workout: workoutId as string },
    });
  }

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
        <Text style={{ color: Palette.danger }}>Workout {workoutId} could not be found</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: Palette.background, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{workout.title}</Text>
          <Text style={styles.description}>{workout.description}</Text>
        </View>

        <Button theme="primary" label="Open In Workout Player" icon="play" onPress={gotoPlayer} />

        <View style={styles.elements}>
          {workout.elements.map((element) => (
            <Element key={element.id} element={element} depth={0} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Element({ element, depth }: { element: WorkoutElement; depth: number }) {
  switch (element.type) {
    case 'Exercise':
      return <ExerciseCard exercise={element} depth={depth} />;
    case 'Rest':
      return <RestCard rest={element} />;
    case 'Block':
      return <BlockCard block={element} depth={depth} />;
    default:
      return null;
  }
}

const isEven = (n: number) => n % 2 === 0;

function ExerciseCard({ exercise, depth }: { exercise: Exercise; depth: number }) {
  return (
    <View style={[styles.card, styles.exerciseCard, isEven(depth) && styles.evenCard]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{exercise.name}</Text>
        <Text style={styles.typeLabel}>Exercise</Text>
      </View>
      <View style={styles.properties}>
        {Object.entries(exercise.properties || {}).map(([key, value]) => (
          <View style={styles.property} key={key}>
            <Text style={styles.propertyLabel}>{key}</Text>
            <Text style={styles.propertyValue}>{Array.isArray(value) ? value.join(' / ') : String(value)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function RestCard({ rest }: { rest: Rest }) {
  return (
    <View style={[styles.card, styles.restCard]}>
      <View style={styles.restContent}>
        <View style={styles.restIcon}>
          <FontAwesome name="clock-o" size={18} color={surfaceDark} />
        </View>
        <View>
          <Text style={styles.restType}>Rest</Text>
          <Text style={styles.restDuration}>{rest.duration} sec</Text>
        </View>
      </View>
    </View>
  );
}

function BlockCard({ block, depth }: { block: Block; depth: number }) {
  return (
    <View style={[styles.card, styles.blockCard, isEven(depth) && styles.evenCard]}>
      <View style={styles.blockHeader}>
        <View style={styles.blockHeaderRow}>
          <Text style={styles.blockTitle}>{block.name}</Text>
          <Text style={styles.blockType}>Block</Text>
        </View>
        <View style={styles.blockProps}>
          {block.properties?.sets && <Text style={styles.blockProp}>Sets: {block.properties.sets}</Text>}
          {block.properties?.restBetweenSets && (
            <Text style={styles.blockProp}>Rest between sets: {block.properties.restBetweenSets} sec</Text>
          )}
        </View>
      </View>
      <View style={styles.blockElements}>
        {block.elements.map((el) => (
          <Element key={el.id} element={el} depth={depth + 1} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: Palette.background,
    gap: Size.Gap.XLarge,
  },
  header: {
    backgroundColor: Palette.surface,
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Palette.textPrimary,
    marginBottom: 8,
  },
  description: {
    color: Palette.textMuted,
    fontSize: 16,
  },
  elements: {
    gap: Size.Gap.Large,
  },
  card: {
    backgroundColor: Palette.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  evenCard: {
    backgroundColor: surfaceDark,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Palette.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Palette.textPrimary,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: Palette.exerciseElement,
    fontWeight: '600',
  },
  properties: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  property: {
    width: '45%',
  },
  propertyLabel: {
    fontSize: 12,
    color: Palette.textMuted,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  propertyValue: {
    fontSize: 16,
    color: Palette.textPrimary,
    fontWeight: '600',
  },
  exerciseCard: {
    borderLeftWidth: 4,
    borderLeftColor: Palette.exerciseElement,
  },
  restCard: {
    borderLeftWidth: 4,
    borderLeftColor: Palette.restElement,
    backgroundColor: '#2a2a2a',
  },
  restContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  restIcon: {
    backgroundColor: Palette.restElement,
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restType: {
    color: Palette.restElement,
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  restDuration: {
    color: Palette.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  blockCard: {
    borderLeftWidth: 4,
    borderLeftColor: Palette.blockElement,
  },
  blockHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Palette.border,
  },
  blockHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Palette.textPrimary,
  },
  blockType: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: Palette.blockElement,
    fontWeight: '600',
  },
  blockProps: {
    flexDirection: 'row',
    gap: 16,
  },
  blockProp: {
    color: Palette.textMuted,
    fontSize: 14,
  },
  blockElements: {
    padding: 16,
    gap: 12,
  },
});
