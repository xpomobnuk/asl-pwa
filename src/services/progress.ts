import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

import { db } from '../firebase'

export const PASS_SCORE = 80

export type LessonProgress = {
  accuracy: number
}

export type UserProgress = Record<
  string,
  LessonProgress
>

export type LessonState = {
  status: 'completed' | 'available' | 'locked'
  bestAccuracy: number | null
}

/**
 * Получить прогресс пользователя
 */
export const getUserProgress = async (
  uid: string
): Promise<UserProgress> => {

  const ref = doc(db, 'users', uid)

  const snap = await getDoc(ref)

  if (!snap.exists()) {
    return {}
  }

  return (
    snap.data().lessonProgress ?? {}
  )

}

/**
 * Сохранить лучший результат урока
 */
export const saveLessonResult = async (
  uid: string,
  lessonId: string,
  accuracy: number
) => {

  const ref = doc(db, 'users', uid)

  const snap = await getDoc(ref)

  let lessonProgress: UserProgress = {}

  if (snap.exists()) {
    lessonProgress =
      snap.data().lessonProgress ?? {}
  }

  const currentAccuracy =
    lessonProgress[lessonId]?.accuracy ?? 0

  // Не ухудшаем лучший результат
  if (accuracy <= currentAccuracy) {
    return
  }

  lessonProgress[lessonId] = {
    accuracy,
  }

  await setDoc(
    ref,
    {
      lessonProgress,
    },
    {
      merge: true,
    }
  )

}


export const calculateLessonStates = (
  lessonOrder: string[],
  progress: UserProgress
): Record<string, LessonState> => {

  const states: Record<
    string,
    LessonState
  > = {}

  let previousCompleted = true

  for (const lessonId of lessonOrder) {

    const accuracy =
      progress[lessonId]?.accuracy ?? null

    if (
      accuracy !== null &&
      accuracy >= PASS_SCORE
    ) {

      states[lessonId] = {
        status: 'completed',
        bestAccuracy: accuracy,
      }

      previousCompleted = true

      continue
    }

    if (previousCompleted) {

      states[lessonId] = {
        status: 'available',
        bestAccuracy: accuracy,
      }

      previousCompleted = false

      continue
    }

    states[lessonId] = {
      status: 'locked',
      bestAccuracy: accuracy,
    }

  }

  return states

}