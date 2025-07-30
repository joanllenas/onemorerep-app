export interface Rest {
  id: string;
  type: 'Rest';
  /** in seconds */
  duration: number;
}

export interface Exercise {
  id: string;
  type: 'Exercise';
  name: string;
  properties: {
    time: number | null;
    // in meters.
    distance: number | null;
    reps: number | 'AMRAP' | null;
    // Either in Kg or a description such as 'light', 'heavy' and so on.
    weight: number | string | null;
    // Either a number or a range such as [0, 1].
    rir: number | number[] | null;
    // Youtube share URL.
    video: string | null;
  };
}

export interface Block {
  id: string;
  type: 'Block';
  name: string | null;
  // The elements this block is composed of. Nested blocks are supported.
  elements: WorkoutElement[];
  properties: {
    // The number of times this block has to be done.
    sets: number | null;
    // How much rest between each set.
    restBetweenSets: number | null;
  };
}

export type WorkoutElement = Exercise | Rest | Block;

export interface Workout {
  id: string;
  title: string;
  description: string;
  elements: WorkoutElement[];
}
