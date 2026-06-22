export type LessonLetter = {
  letter: string
  video: string
}

export type LessonWord = {
  word: string
  letters: string[]
}
export type LessonType =
  | 'beginner'
  | 'intermediate'


export type Lesson = {
  id: string

  title: string

  description: string

  type: LessonType

  letters: LessonLetter[]

  words: LessonWord[]
}