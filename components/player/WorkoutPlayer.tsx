import { Palette } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { Exercise, Workout } from '@/model/workout.types';
import React, { useEffect, useReducer, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Button from '../Button';
import { workoutActions } from './actions';
import { initialState, workoutReducer } from './reducer';
import { formatSeconds } from './utils';

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
      <View style={styles.statusContainer}>
        <Text style={styles.totalTime}>Elapsed Time: {formatSeconds(state.elapsedTime)}</Text>

        {currentExercise.type === 'Exercise' ? (
          <>
            <Text style={styles.exerciseName}>{(currentExercise as Exercise).name}</Text>
            {state.elementTimer?.type === 'exercise' && (
              <>
                <Text>Exercise Time: {formatSeconds(state.elementTimer.elapsed)}</Text>
                <Text style={styles.timeInfo}>
                  {formatSeconds(currentExercise.properties?.time! - state.elementTimer.elapsed)}
                </Text>
              </>
            )}
            {currentExercise.properties?.video && (
              <View style={styles.video}>
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
          </>
        ) : currentExercise.type === 'Rest' ? (
          state.elementTimer?.type === 'rest' && (
            <>
              <Text style={styles.exerciseName}>Rest</Text>
              <Text style={styles.timeInfo}>{formatSeconds(state.elementTimer.remaining)}</Text>
            </>
          )
        ) : null}
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Palette.background,
    padding: Size.Padding.Screen,
    justifyContent: 'space-between',
  },

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

  statusContainer: {
    flex: 1,
    backgroundColor: Palette.surface,
    borderRadius: Size.BorderRadius.ListItem,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    paddingVertical: Size.Padding.Large,
    gap: Size.Gap.XXLarge,
  },

  totalTime: {
    fontSize: 16,
    fontWeight: '500',
    color: Palette.textMuted,
  },

  exerciseName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Palette.textPrimary,
    textAlign: 'center',
  },

  timeInfo: {
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

  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.Padding.Screen,
  },

  video: {
    width: '100%',
  },
});
