export type VocabularyWord = {
  id: string
  word: string
  video: string
}

export type VocabularyLessonData = {
  id: string

  slug: string

  engine: 'vocabulary'

  title: string

  words: VocabularyWord[]
}