import { WorkoutDto } from '@/model/appwrite.types';
import { workoutsDecoder } from '@/model/workout.decoder';
import { Workout } from '@/model/workout.types';

const dummyWorkoutsCollection: WorkoutDto[] = [
  {
    $id: 'w1',
    $permissions: [],
    $createdAt: '2024-01-01T00:00:00.000Z',
    $updatedAt: '2024-01-01T00:00:00.000Z',
    $databaseId: 'db1',
    $collectionId: 'col1',
    title: 'Quick Strength Circuit',
    description: 'A short circuit focusing on compound strength exercises.',
    elements: [
      {
        id: 'e1',
        type: 'Exercise',
        name: 'Deadlift',
        properties: {
          reps: 5,
          weight: 120,
          rir: 2,
        },
      },
      {
        id: 'r1',
        type: 'Rest',
        duration: 60,
      },
      {
        id: 'e2',
        type: 'Exercise',
        name: 'Pull-Up',
        properties: {
          reps: 'AMRAP',
          rir: [1, 2],
        },
      },
    ],
  },
  {
    $id: 'w2',
    $permissions: [],
    $createdAt: '2024-01-02T00:00:00.000Z',
    $updatedAt: '2024-01-02T00:00:00.000Z',
    $databaseId: 'db1',
    $collectionId: 'col1',
    title: 'Conditioning Intervals',
    description: 'Endurance-focused intervals with running and rest periods.',
    elements: [
      {
        id: 'e3',
        type: 'Exercise',
        name: 'Run',
        properties: {
          time: 300,
          distance: 1000,
        },
      },
      {
        id: 'r2',
        type: 'Rest',
        duration: 90,
      },
      {
        id: 'e4',
        type: 'Exercise',
        name: 'Burpees',
        properties: {
          time: 60,
          video: 'https://example.com/videos/burpees.mp4',
        },
      },
    ],
  },
  {
    $id: 'w3',
    $permissions: [],
    $createdAt: '2024-01-03T00:00:00.000Z',
    $updatedAt: '2024-01-03T00:00:00.000Z',
    $databaseId: 'db1',
    $collectionId: 'col1',
    title: 'Upper Body Block',
    description: 'Superset targeting upper body strength.',
    elements: [
      {
        id: 'b1',
        type: 'Block',
        name: 'Push-Pull Superset',
        elements: [
          {
            id: 'e5',
            type: 'Exercise',
            name: 'Bench Press',
            properties: {
              reps: 8,
              weight: '70kg',
              rir: 1,
            },
          },
          {
            id: 'e6',
            type: 'Exercise',
            name: 'Barbell Row',
            properties: {
              reps: 10,
              weight: 60,
            },
          },
          {
            id: 'r3',
            type: 'Rest',
            duration: 90,
          },
        ],
        properties: {
          sets: 3,
          restBetweenSets: 120,
        },
      },
    ],
  },
];

export function fetchWorkouts(): Promise<Workout[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1000);
  }).then(() => workoutsDecoder.decodePromise(dummyWorkoutsCollection));
}
