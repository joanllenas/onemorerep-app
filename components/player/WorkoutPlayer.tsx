import { Exercise, Workout } from '@/model/workout.types';
import React, { useEffect, useReducer, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createWorkoutActions } from './actions';
import { initialState, workoutReducer } from './reducer';
import { formatSeconds } from './utils';

export default function WorkoutPlayer({ workout }: { workout: Workout }) {
  const [state, dispatch] = useReducer(workoutReducer, workout, ({ elements }) => ({ ...initialState, elements }));
  const intervalRef = useRef<number | null>(null);

  const currentExercise = workout.elements[state.currentElementIndex];

  // Timer effects
  useEffect(() => {
    if (!state.isPaused && !state.isCompleted && !state.isStopped) {
      intervalRef.current = setInterval(() => {
        dispatch(createWorkoutActions.tickTotal());

        if (state.isResting) {
          dispatch(createWorkoutActions.tickRest());
        } else {
          dispatch(createWorkoutActions.tickExercise());
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [state.isPaused, state.isCompleted, state.isResting, state.isStopped]);

  const handleNextElement = () => {
    dispatch(createWorkoutActions.nextElement());
  };

  const handleStop = () => {
    dispatch(createWorkoutActions.stopWorkout());
  };

  const handlePauseResume = () => {
    if (state.isPaused) {
      dispatch(createWorkoutActions.resumeWorkout());
    } else {
      dispatch(createWorkoutActions.pauseWorkout());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Player</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.exerciseName}>{(currentExercise as Exercise)?.name || 'Workout Complete!'}</Text>
        {!state.isCompleted && !state.isResting && (
          <Text style={styles.timeInfo}>Exercise Time: {formatSeconds(state.exerciseTimeElapsed)}</Text>
        )}
        <Text style={styles.totalTime}>Total Time: {formatSeconds(state.totalWorkoutTime)}</Text>
        {state.isResting && <Text style={styles.restTime}>Rest: {formatSeconds(state.restTimeRemaining)}</Text>}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handlePauseResume} disabled={state.isCompleted}>
          <Text style={styles.buttonText}>{state.isPaused ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNextElement} disabled={state.isCompleted}>
          <Text style={styles.buttonText}>Next Exercise</Text>
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  statusContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  timeInfo: {
    fontSize: 16,
    marginBottom: 5,
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
