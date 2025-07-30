export interface Rest {
  id: string;
  type: 'Rest';
  // in seconds
  duration: number;
}

export interface Exercise {
  id: string;
  type: 'Exercise';
  name: string;
  properties?: {
    // in seconds
    time?: number;
    // in meters.
    distance?: number;
    reps?: number | 'AMRAP';
    // Either in Kg or a description such as 'light', 'heavy' and so on.
    weight?: number | string;
    // Either a number or a range such as [0, 1].
    rir?: number | [number, number];
    // Youtube share URL.
    video?: string;
  };
}

export interface Block {
  id: string;
  type: 'Block';
  // Optional block name such as 'Warm-up', 'Upper Body' or 'Pull-up / Push-up Superset'
  name?: string;
  // The elements this block is composed of. Nested blocks are supported.
  elements: WorkoutElement[];
  properties?: {
    // The number of times this block has to be done.
    sets?: number;
    // How much rest between each set.
    restBetweenSets?: number;
  };
}

export type WorkoutElement = Exercise | Rest | Block;

export interface Workout {
  id: string;
  title: string;
  description: string;
  elements: WorkoutElement[];
}
