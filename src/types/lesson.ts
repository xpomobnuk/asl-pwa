export type LessonLetter = {
  letter: string
  video: string
}

export type LessonWord = {
  word: string
  letters: string[]
}

export type VocabularyWord = {
  id: string
  word: string
  video: string
}

export type LessonType =
  | 'beginner'
  | 'intermediate'

export type AlphabetLessonData = {
  id: string

  slug: string

  engine: 'alphabet'

  title: string

  description: string

  image: string

  type: LessonType

  letters: LessonLetter[]

  words: LessonWord[]
}

export type VocabularyLessonData = {
  id: string

  slug: string

  engine: 'vocabulary'

  title: string

  words: VocabularyWord[]
}

export type LessonData =
  | AlphabetLessonData
  | VocabularyLessonData