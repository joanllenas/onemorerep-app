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
        duration: 20,
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
  {
    $id: 'w4',
    $permissions: [],
    $createdAt: '2024-01-04T00:00:00.000Z',
    $updatedAt: '2024-01-04T00:00:00.000Z',
    $databaseId: 'db1',
    $collectionId: 'col1',
    title: 'Kettlebell 1',
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
            name: 'Deadlift',
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
          {
            id: 'e7',
            type: 'Exercise',
            name: 'Barbell Row',
            properties: {
              reps: 10,
              weight: 60,
            },
          },
        ],
        properties: {
          sets: 3,
          restBetweenSets: 120,
        },
      },
    ],
  },
  {
    $id: 'w5',
    $permissions: [],
    $createdAt: '2024-01-05T00:00:00.000Z',
    $updatedAt: '2024-01-05T00:00:00.000Z',
    $databaseId: 'db1',
    $collectionId: 'col1',
    title: 'Full Body Complex',
    description:
      'A mixed workout combining isolated elements and nested blocks for full-body strength and conditioning.',
    elements: [
      {
        id: 'e1',
        type: 'Exercise',
        name: 'Air Squats',
        properties: {
          reps: 20,
        },
      },
      {
        id: 'r1',
        type: 'Rest',
        duration: 30,
      },
      {
        id: 'b1',
        type: 'Block',
        name: 'Upper Body Strength',
        elements: [
          {
            id: 'e2',
            type: 'Exercise',
            name: 'Push Press',
            properties: {
              reps: 10,
              weight: 50,
              rir: 2,
            },
          },
          {
            id: 'r2',
            type: 'Rest',
            duration: 45,
          },
          {
            id: 'e3',
            type: 'Exercise',
            name: 'Chin-Ups',
            properties: {
              reps: 'AMRAP',
              rir: [1, 2],
            },
          },
        ],
        properties: {
          sets: 3,
          restBetweenSets: 90,
        },
      },
      {
        id: 'b2',
        type: 'Block',
        name: 'Core and Conditioning',
        elements: [
          {
            id: 'e4',
            type: 'Exercise',
            name: 'Plank Hold',
            properties: {
              time: 60,
            },
          },
          {
            id: 'b3',
            type: 'Block',
            name: 'Mini Cardio Finisher',
            elements: [
              {
                id: 'e5',
                type: 'Exercise',
                name: 'Mountain Climbers',
                properties: {
                  time: 30,
                  video: 'https://example.com/videos/mountain-climbers.mp4',
                },
              },
              {
                id: 'r3',
                type: 'Rest',
                duration: 15,
              },
              {
                id: 'e6',
                type: 'Exercise',
                name: 'Jump Squats',
                properties: {
                  reps: 15,
                },
              },
            ],
            properties: {
              sets: 2,
              restBetweenSets: 30,
            },
          },
        ],
        properties: {
          sets: 2,
          restBetweenSets: 60,
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
