import { Exercise, WorkoutElement } from '@/model/workout.types';
import { bottomWithReturn } from '@/utils/bottom';
import { WorkoutAction } from './_actions';

interface WorkoutState {
  elements: WorkoutElement[];
  currentElementIndex: number;
  isResting: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  isStopped: boolean;
  restTimeRemaining: number;
  exerciseTimeElapsed: number;
  totalWorkoutTime: number;
}

export const initialState: WorkoutState = {
  elements: [],
  currentElementIndex: 0,
  isResting: false,
  isPaused: false,
  isCompleted: false,
  isStopped: true,
  restTimeRemaining: 0,
  exerciseTimeElapsed: 0,
  totalWorkoutTime: 0,
};

export function workoutReducer(state: WorkoutState, action: WorkoutAction): WorkoutState {
  switch (action.type) {
    case 'STOP_WORKOUT':
      return {
        ...initialState,
      };

    case 'START_WORKOUT':
      return {
        ...state,
        currentElementIndex: 0,
        isResting: false,
        isPaused: false,
        isCompleted: false,
        isStopped: false,
        restTimeRemaining: 0,
        exerciseTimeElapsed: 0,
        totalWorkoutTime: 0,
      };

    case 'PAUSE_WORKOUT': {
      return {
        ...state,
        isPaused: true,
      };
    }

    case 'RESUME_WORKOUT': {
      return {
        ...state,
        isPaused: false,
      };
    }

    case 'NEXT_ELEMENT': {
      return nextElementFn(state);
    }

    case 'TICK_REST': {
      const restTimeRemaining = Math.max(0, state.restTimeRemaining - 1);

      if (restTimeRemaining === 0) {
        return nextElementFn(state);
      }

      return {
        ...state,
        restTimeRemaining,
      };
    }

    case 'TICK_EXERCISE': {
      const currentExercise = state.elements[state.currentElementIndex] as Exercise;

      if (currentExercise.properties?.time !== undefined) {
        const exerciseTimeElapsed = state.exerciseTimeElapsed + 1;
        const timeRemaining = Math.max(0, currentExercise.properties.time - exerciseTimeElapsed);
        if (timeRemaining === 0) {
          return nextElementFn(state);
        }

        return {
          ...state,
          exerciseTimeElapsed,
        };
      }
    }

    case 'TICK_TOTAL': {
      return {
        ...state,
        totalWorkoutTime: state.totalWorkoutTime + 1,
      };
    }

    case 'COMPLETE_WORKOUT': {
      return {
        ...state,
        isCompleted: true,
      };
    }

    default: {
      return bottomWithReturn(action, state);
    }
  }
}
function nextElementFn(state: WorkoutState): WorkoutState {
  const nextIndex = state.currentElementIndex + 1;
  const isLastExercise = nextIndex >= state.elements.length;

  if (isLastExercise) {
    return {
      ...state,
      isCompleted: true,
    };
  }

  const nextElement = state.elements[nextIndex] as WorkoutElement;
  if (nextElement.type === 'Exercise') {
    return {
      ...state,
      currentElementIndex: nextIndex,
      isResting: false,
      isPaused: false,
      isCompleted: false,
      isStopped: false,
      restTimeRemaining: 0,
      exerciseTimeElapsed: 0,
    };
  } else if (nextElement.type === 'Rest') {
    return {
      ...state,
      currentElementIndex: nextIndex,
      isResting: true,
      isPaused: false,
      isCompleted: false,
      isStopped: false,
      restTimeRemaining: nextElement.duration,
      exerciseTimeElapsed: 0,
    };
  }

  throw new Error(`Unknown element type "${nextElement.type}"`);
}
