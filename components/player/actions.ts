import { WorkoutElement } from '@/model/workout.types';

export type WorkoutAction =
  | { type: 'START_WORKOUT'; payload: { elements: WorkoutElement[] } }
  | { type: 'STOP_WORKOUT' }
  | { type: 'PAUSE_WORKOUT' }
  | { type: 'RESUME_WORKOUT' }
  | { type: 'NEXT_ELEMENT' }
  | { type: 'TICK' };

export const workoutActions = {
  startWorkout: (elements: WorkoutElement[]): WorkoutAction => ({ type: 'START_WORKOUT', payload: { elements } }),
  stopWorkout: (): WorkoutAction => ({ type: 'STOP_WORKOUT' }),
  pauseWorkout: (): WorkoutAction => ({ type: 'PAUSE_WORKOUT' }),
  resumeWorkout: (): WorkoutAction => ({ type: 'RESUME_WORKOUT' }),
  nextElement: (): WorkoutAction => ({ type: 'NEXT_ELEMENT' }),
  tick: (): WorkoutAction => ({ type: 'TICK' }),
};
