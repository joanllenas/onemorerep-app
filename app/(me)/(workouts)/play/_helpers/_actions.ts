import { WorkoutElement } from '@/model/workout.types';

export type WorkoutAction =
  | { type: 'STOP_WORKOUT' }
  | { type: 'START_WORKOUT'; payload: { elements: WorkoutElement[] } }
  | { type: 'PAUSE_WORKOUT' }
  | { type: 'RESUME_WORKOUT' }
  //
  | { type: 'NEXT_ELEMENT' }
  | { type: 'TICK_REST' }
  | { type: 'TICK_EXERCISE' }
  | { type: 'TICK_TOTAL' }
  | { type: 'COMPLETE_WORKOUT' };

export const createWorkoutActions = {
  stopWorkout: (): WorkoutAction => ({ type: 'STOP_WORKOUT' }),
  startWorkout: (elements: WorkoutElement[]): WorkoutAction => ({ type: 'START_WORKOUT', payload: { elements } }),
  pauseWorkout: (): WorkoutAction => ({ type: 'PAUSE_WORKOUT' }),
  resumeWorkout: (): WorkoutAction => ({ type: 'RESUME_WORKOUT' }),
  //
  nextElement: (): WorkoutAction => ({ type: 'NEXT_ELEMENT' }),
  tickRest: (): WorkoutAction => ({ type: 'TICK_REST' }),
  tickExercise: (): WorkoutAction => ({ type: 'TICK_EXERCISE' }),
  tickTotal: (): WorkoutAction => ({ type: 'TICK_TOTAL' }),
  completeWorkout: (): WorkoutAction => ({ type: 'COMPLETE_WORKOUT' }),
};
