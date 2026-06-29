export type LessonProgress = {
  status: 'completed' | 'available' | 'locked'
  bestAccuracy: number | null
}

export const lessonProgress: Record<
  string,
  LessonProgress
> = {
  'alphabet-beginner-01': {
    status: 'completed',
    bestAccuracy: 92,
  },

  'alphabet-beginner-02': {
    status: 'available',
    bestAccuracy: 76,
  },

  'alphabet-beginner-03': {
    status: 'locked',
    bestAccuracy: null,
  },

  'alphabet-beginner-04': {
    status: 'locked',
    bestAccuracy: null,
  },

  'alphabet-beginner-05': {
    status: 'locked',
    bestAccuracy: null,
  },

  'alphabet-beginner-06': {
    status: 'locked',
    bestAccuracy: null,
  },

  'alphabet-beginner-07': {
    status: 'locked',
    bestAccuracy: null,
  },

  'alphabet-beginner-08': {
    status: 'locked',
    bestAccuracy: null,
  },

  'alphabet-intermediate-01': {
    status: 'locked',
    bestAccuracy: null,
  },

  'alphabet-intermediate-02': {
    status: 'locked',
    bestAccuracy: null,
  },
}

export const getLessonProgress = (
  lessonId: string
): LessonProgress => {
  return (
    lessonProgress[lessonId] ?? {
      status: 'locked',
      bestAccuracy: null,
    }
  )
}