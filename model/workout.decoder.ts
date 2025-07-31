import * as JsonDecoder from 'ts.data.json';
import { AppWriteEntity, WorkoutDto } from './appwrite.types';
import { Workout } from './workout.types';

type DtoWithoutMetadata = Omit<WorkoutDto, keyof Omit<AppWriteEntity, '$id'>>;
const workoutDtoDecoder: JsonDecoder.Decoder<DtoWithoutMetadata> = JsonDecoder.object(
  {
    $id: JsonDecoder.string(),
    title: JsonDecoder.string(),
    description: JsonDecoder.optional(JsonDecoder.string()),
    elements: JsonDecoder.succeed(),
  },
  'WorkoutDto'
);
export const workoutDecoder: JsonDecoder.Decoder<Workout> = workoutDtoDecoder.map((dto) => ({ ...dto, id: dto.$id }));
export const workoutsDecoder: JsonDecoder.Decoder<Workout[]> = JsonDecoder.array(workoutDecoder, 'Workout[]');
