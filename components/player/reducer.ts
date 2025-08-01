import { Exercise, WorkoutElement } from '@/model/workout.types';
import { bottomWithReturn } from '@/utils/bottom';
import { WorkoutAction } from './actions';

type ElementTimer = { type: 'rest'; remaining: number } | { type: 'exercise'; elapsed: number } | null;

interface WorkoutState {
  elements: WorkoutElement[];
  currentElementIndex: number;
  playerStatus: 'playing' | 'paused' | 'stopped' | 'completed';
  elementTimer: ElementTimer;
  elapsedTime: number;
}

export const initialState: WorkoutState = {
  elements: [],
  currentElementIndex: 0,
  playerStatus: 'stopped',
  elementTimer: null,
  elapsedTime: 0,
};

export function workoutReducer(state: WorkoutState, action: WorkoutAction): WorkoutState {
  switch (action.type) {
    case 'STOP_WORKOUT':
      return {
        ...initialState,
        elements: state.elements,
      };

    case 'START_WORKOUT': {
      return {
        ...state,
        playerStatus: 'playing',
        elementTimer: elementTimerFn(state),
      };
    }

    case 'PAUSE_WORKOUT': {
      return {
        ...state,
        playerStatus: 'paused',
      };
    }

    case 'RESUME_WORKOUT': {
      return {
        ...state,
        playerStatus: 'playing',
      };
    }

    case 'NEXT_ELEMENT': {
      return nextElementFn(state);
    }

    case 'TICK': {
      const elapsedTime = state.elapsedTime + 1;

      if (state.elementTimer === null) {
        return {
          ...state,
          elapsedTime,
        };
      }

      if (state.elementTimer.type === 'rest') {
        const restTimeRemaining = Math.max(0, state.elementTimer.remaining - 1);

        if (restTimeRemaining === 0) {
          return nextElementFn({ ...state, elapsedTime });
        }

        return {
          ...state,
          elementTimer: { type: 'rest', remaining: restTimeRemaining },
          elapsedTime,
        };
      }

      if (state.elementTimer.type === 'exercise') {
        const currentExercise = state.elements[state.currentElementIndex] as Exercise;
        const exerciseTimeElapsed = state.elementTimer.elapsed + 1;
        const timeRemaining = Math.max(0, currentExercise.properties?.time! - exerciseTimeElapsed);

        if (timeRemaining === 0) {
          return nextElementFn({ ...state, elapsedTime });
        }

        return {
          ...state,
          elementTimer: { type: 'exercise', elapsed: exerciseTimeElapsed },
          elapsedTime,
        };
      }

      return bottomWithReturn(state.elementTimer, state);
    }

    default: {
      return bottomWithReturn(action, state);
    }
  }
}

// ------------------------------------
//
//  UTILS
//
// ------------------------------------

function nextElementFn(state: WorkoutState): WorkoutState {
  const nextIndex = state.currentElementIndex + 1;
  const isLastElement = nextIndex >= state.elements.length;

  if (isLastElement) {
    return {
      ...state,
      playerStatus: 'completed',
    };
  }

  const nextElement = state.elements[nextIndex];

  if (nextElement.type === 'Exercise') {
    return {
      ...state,
      currentElementIndex: nextIndex,
      elementTimer: nextElement.properties?.time ? { type: 'exercise', elapsed: 0 } : null,
    };
  } else if (nextElement.type === 'Rest') {
    return {
      ...state,
      currentElementIndex: nextIndex,
      elementTimer: { type: 'rest', remaining: nextElement.duration },
    };
  }

  throw new Error(`Illegal element type "${nextElement.type}"`);
}

function elementTimerFn(state: WorkoutState): ElementTimer {
  const el = state.elements[state.currentElementIndex];
  if (el.type === 'Rest') {
    return { type: 'rest', remaining: el.duration };
  }
  if (el.type === 'Exercise' && el.properties?.time) {
    return { type: 'exercise', elapsed: 0 };
  }
  return null;
}
