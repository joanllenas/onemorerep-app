import { Palette } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { Exercise, Workout, WorkoutElement } from '@/model/workout.types';
import React, { useEffect, useReducer, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Button from '../Button';
import { workoutActions } from './actions';
import { ElementTimer, initialState, workoutReducer } from './reducer';
import { formatReps, formatRir, formatSeconds, formatWeight } from './utils';

export default function WorkoutPlayer({ workout }: { workout: Workout }) {
  const [state, dispatch] = useReducer(workoutReducer, workout, ({ elements }) => ({ ...initialState, elements }));
  const intervalRef = useRef<number | null>(null);

  const currentExercise = workout.elements[state.currentElementIndex];

  // Timer effects
  useEffect(() => {
    if (state.playerStatus === 'playing') {
      intervalRef.current = setInterval(() => {
        dispatch(workoutActions.tick());
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [state.playerStatus]);

  const handleNextElement = () => {
    dispatch(workoutActions.nextElement());
  };

  const handleStart = () => {
    dispatch(workoutActions.startWorkout(workout.elements));
  };

  const handleStop = () => {
    dispatch(workoutActions.stopWorkout());
  };

  const handlePauseResume = () => {
    if (state.playerStatus === 'paused') {
      dispatch(workoutActions.resumeWorkout());
    } else {
      dispatch(workoutActions.pauseWorkout());
    }
  };

  if (state.playerStatus === 'stopped') {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{workout.title}</Text>
          <Text style={styles.description}>{workout.description}</Text>
        </View>
        <Button onPress={handleStart} theme="primary" label="Start Workout" icon="play-circle" />
      </View>
    );
  }

  if (state.playerStatus === 'completed') {
    return (
      <View style={styles.completedContainer}>
        <Text style={styles.title}>Workout Completed! 🎉</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Top elapsedTime={state.elapsedTime} currentElement={currentExercise} />

      {currentExercise.type === 'Exercise' && currentExercise.properties?.video && (
        <View style={{ width: '100%' }}>
          <YoutubePlayer
            height={200}
            initialPlayerParams={{
              loop: true,
              controls: false,
            }}
            forceAndroidAutoplay={true}
            play={true}
            mute={true}
            videoId={currentExercise.properties?.video}
          />
        </View>
      )}

      <Bottom elapsedTime={state.elapsedTime} currentElement={currentExercise} elementTimer={state.elementTimer} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handlePauseResume}>
          <Text style={styles.buttonText}>{state.playerStatus === 'paused' ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNextElement} disabled={state.playerStatus !== 'playing'}>
          <Text style={styles.buttonText}>{state.elementTimer ? 'Skip' : 'Next'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Top({ elapsedTime, currentElement }: { elapsedTime: number; currentElement: WorkoutElement }) {
  return (
    <View style={styles.topContainer}>
      <Text style={styles.elapsedTime}>Elapsed Time: {formatSeconds(elapsedTime)}</Text>
      {currentElement.type === 'Exercise' ? (
        <Text style={styles.exerciseTitle}>{currentElement.name}</Text>
      ) : currentElement.type === 'Rest' ? (
        <Text style={styles.exerciseTitle}>Rest</Text>
      ) : null}
    </View>
  );
}

function Bottom({
  elapsedTime,
  currentElement,
  elementTimer,
}: {
  elapsedTime: number;
  currentElement: WorkoutElement;
  elementTimer: ElementTimer;
}) {
  return (
    <View style={styles.bottomContainer}>
      {currentElement.type === 'Exercise' ? (
        <ExerciseInfo elapsedTime={elapsedTime} elementTimer={elementTimer} exercise={currentElement} />
      ) : currentElement.type === 'Rest' ? (
        elementTimer?.type === 'rest' && <Text style={styles.timer}>{formatSeconds(elementTimer.remaining)}</Text>
      ) : null}
    </View>
  );
}

function ExerciseInfo({
  exercise,
  elementTimer,
  elapsedTime,
}: {
  exercise: Exercise;
  elementTimer: ElementTimer;
  elapsedTime: number;
}) {
  return (
    <View style={{ gap: 20, alignItems: 'center', width: '100%' }}>
      {elementTimer?.type === 'exercise' && (
        <Text style={styles.timer}>{formatSeconds(exercise.properties?.time! - elapsedTime)}</Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          backgroundColor: Palette.surface,
          padding: Size.Padding.Medium,
          borderRadius: Size.BorderRadius.ListItem,
        }}
      >
        {exercise.properties?.weight && (
          <Text style={styles.exerciseProperties}>{formatWeight(exercise.properties.weight)}</Text>
        )}
        {exercise.properties?.reps && (
          <Text style={[styles.exerciseProperties, { fontSize: 40, color: Palette.textPrimary }]}>
            {formatReps(exercise.properties.reps, 'x')}
          </Text>
        )}
        {exercise.properties?.rir && (
          <Text style={styles.exerciseProperties}>{formatRir(exercise.properties.rir)}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: Size.Text.XXLarge,
    color: Palette.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  description: {
    fontSize: Size.Text.Medium,
    color: Palette.textMuted,
    textAlign: 'center',
    marginBottom: 30,
  },

  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.Padding.Screen,
  },

  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Palette.background,
    padding: Size.Padding.Screen,
    justifyContent: 'space-between',
  },
  topContainer: {
    alignItems: 'center',
    gap: Size.Gap.Medium,
  },
  elapsedTime: {
    color: Palette.textMuted,
    fontWeight: 'bold',
    fontSize: Size.Text.Small,
  },
  exerciseTitle: {
    fontSize: Size.Text.XXLarge * 2,
    color: Palette.textPrimary,
    fontWeight: 'bold',
  },
  exerciseProperties: {
    fontSize: Size.Text.XLarge,
    color: Palette.textMuted,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    gap: Size.Gap.Medium,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Palette.accent,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Size.Gap.Large,
    marginTop: 30,
  },

  button: {
    flex: 1,
    backgroundColor: Palette.accentHover,
    paddingHorizontal: Size.Padding.Large,
    paddingVertical: Size.Padding.Medium,
    borderRadius: 12,
    alignItems: 'center',
  },

  stopButton: {
    backgroundColor: Palette.danger,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.background,
  },
});
