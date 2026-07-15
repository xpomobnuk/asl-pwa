import { useParams } from 'react-router-dom'

import { allLessons } from '../../lessons'

import { AlphabetLesson } from '../../lesson-engines/alphabet/AlphabetLesson'

import { VocabularyLesson } from '../../lesson-engines/vocabulary/VocabularyLesson'

export const Lesson = () => {

  const { lessonSlug } = useParams()

  const lesson =
    allLessons.find(
      lesson => lesson.slug === lessonSlug
    )

  if (!lesson) {

    return (
      <div className="container">
        Lesson not found
      </div>
    )

  }

  switch (lesson.engine) {

    case 'alphabet':

      return (
        <AlphabetLesson
          lesson={lesson}
        />
      )

    case 'vocabulary':

      return (
        <VocabularyLesson
          lesson={lesson}
        />
      )

    default:

      return (
        <div className="container">
          Unknown lesson engine
        </div>
      )

  }

}