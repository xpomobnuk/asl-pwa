import type { LessonData } from './lesson'

export type LessonStatus =
  | 'completed'
  | 'available'
  | 'locked'

export type ModuleLesson = {
  id: string
  slug: string
  title: string
  description: string
  image: string

  routeType: 'lesson' | 'page'

  status: LessonStatus
}

export type ModuleGroup = {
  id: string
  title: string
  description: string
  image: string
  color: string

  lessons: LessonData[]
}