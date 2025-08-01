import { Exercise, WorkoutElement } from '@/model/workout.types';
import { intervalToDuration } from 'date-fns';

let id = 0;
const mkId = (): string => {
  return `id-${(id++).toString(10).padStart(3, '0')}`;
};

export function formatSeconds(seconds: number): string {
  const end = new Date();
  end.setSeconds(end.getSeconds() + seconds);
  const start = new Date();
  const interval = intervalToDuration({ start, end });
  const min = ((interval.hours ?? 0) * 60 + (interval.minutes ?? 0)).toString(10).padStart(2, '0');
  const sec = (interval.seconds ?? 0).toString(10).padStart(2, '0');

  return `${min}:${sec}`;
}

// Workout

export const flattenWorkoutElements = (elements: WorkoutElement[]): WorkoutElement[] =>
  flatten(elements).map((element) => ({
    ...element,
    id: mkId(),
  }));

const flatten = (elements: WorkoutElement[]): WorkoutElement[] => {
  return elements.reduce((acc, cur) => {
    if (cur.type === 'Block') {
      const sets = cur.properties?.sets || 1;
      const restBetweenSets = cur.properties?.restBetweenSets || 0;

      let flattened: (WorkoutElement | WorkoutElement[])[] = [];
      for (let i = 0; i < sets; i++) {
        flattened.push(flatten(cur.elements));
        if (restBetweenSets > 0 && i < sets - 1) {
          flattened = [...flattened, { type: 'Rest', duration: restBetweenSets, id: '' }];
        }
      }
      acc.push(...flattened.flat());
    } else {
      acc.push(cur);
    }
    return acc;
  }, [] as WorkoutElement[]);
};

export const sanitizeVideoUrls = (elements: WorkoutElement[]): WorkoutElement[] =>
  elements.map((el) => {
    if (el.type === 'Exercise' && el.properties?.video) {
      return {
        ...el,
        properties: { ...el.properties, video: sanitizeVideoUrl(el.properties.video) },
      };
    }
    return el;
  });

// Exercise

export const exerciseHasProperties = (ex: Exercise) =>
  Object.entries(ex).filter(([, value]) => value !== null).length > 0;

type Reps = NonNullable<NonNullable<Exercise['properties']>['reps']>;

export function formatReps(reps: Reps, suffix = ' reps'): string {
  return typeof reps === 'string' ? reps : `${reps}${suffix}`;
}

export function formatWeight(weight: string | number, suffix = ' Kg'): string {
  if (typeof weight === 'string') {
    return weight;
  } else if (typeof weight === 'number') {
    return `${weight}${suffix}`;
  }
  return '??';
}

export function formatRir(rir: number | number[], pereffix = 'rir '): string {
  if (typeof rir === 'number') {
    return `${pereffix}${rir}`;
  } else if (Array.isArray(rir)) {
    return `${pereffix}(${rir.join('-')})`;
  }
  return '??';
}

export function sanitizeVideoUrl(shareUrl: string): string | undefined {
  return formatYoutubeEmbedId(shareUrl);
}

function formatYoutubeEmbedId(url: string): string | undefined {
  let videoId = '';

  // Test for standard "watch" URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(new URL(url).search);
    videoId = urlParams.get('v')!;
  }
  // Test for shortened "youtu.be" URL (e.g., https://youtu.be/dQw4w9WgXcQ)
  else if (url.includes('youtu.be/')) {
    videoId = new URL(url).pathname.split('/')![1];
  }
  // Test for shorts "youtube.com/shorts" URL (e.g., https://www.youtube.com/shorts/Some-Video-ID)
  else if (url.includes('youtube.com/shorts')) {
    videoId = new URL(url).pathname.split('/')![2];
  }
  // Test for "embed" URL (e.g., https://www.youtube.com/embed/dQw4w9WgXcQ)
  else if (url.includes('youtube.com/embed/')) {
    videoId = new URL(url).pathname.split('/')![2];
  }

  // If a video ID was found, return the embed URL, otherwise return null
  if (videoId) {
    return videoId;
  } else {
    return undefined; // Invalid URL or no video ID found
  }
}
