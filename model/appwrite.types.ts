import { Workout } from './workout.types';

// 2023-09-13T03:49:12.905+00:00
type IsoDateString = string;

export interface AppWriteEntity {
  $id: string;
  $permissions: any[];
  $createdAt: IsoDateString;
  $updatedAt: IsoDateString;
  $databaseId: string;
  $collectionId: string;
}

export interface WorkoutDto extends AppWriteEntity, Omit<Workout, 'id'> {}
