import { Palette } from '@/constants/color';
import { Size } from '@/constants/sizes';
import { Exercise, Workout } from '@/model/workout.types';
import React, { useEffect, useReducer, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        <Text style={styles.title}>{workout.title}</Text>
        <Text style={{ color: Palette.textMuted, textAlign: 'center' }}>{workout.description}</Text>
        <Button onPress={handleStart} theme="primary" label="Start" icon="play-circle" />
      </View>
    );
  }

  if (state.playerStatus === 'completed') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Completed! 🎉</Text>
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
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Size.Padding.Screen,
    gap: Size.Gap.Large,
  },
  title: {
    fontSize: Size.Text.XXLarge,
    color: Palette.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  timeInfo: {
    fontSize: 40,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  totalTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restTime: {
    fontSize: 18,
    color: 'orange',
    fontWeight: 'bold',
  },
  controls: {
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
