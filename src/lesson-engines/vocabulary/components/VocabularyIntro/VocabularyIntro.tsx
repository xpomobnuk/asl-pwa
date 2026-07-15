import { useState } from 'react'

import { VocabularyVideo } from '../VocabularyVideo/VocabularyVideo'

import type {
  VocabularyLessonData,
} from '../../types'

import './VocabularyIntro.css'

type Props = {
  lesson: VocabularyLessonData
  onComplete: () => void
}

export const VocabularyIntro = ({
  lesson,
  onComplete,
}: Props) => {

  const [currentIndex, setCurrentIndex] =
    useState(0)

  const currentWord =
    lesson.words[currentIndex]

  const isLastWord =
    currentIndex === lesson.words.length - 1

  const handleNext = () => {

    if (!isLastWord) {

      setCurrentIndex(prev => prev + 1)

      return

    }

    onComplete()

  }

  return (

    <div className="vocabulary-intro">

      <div className="vocabulary-progress">

        {currentIndex + 1}
        {' / '}
        {lesson.words.length}

      </div>

      <VocabularyVideo
        src={currentWord.video}
      />

      <div className="vocabulary-word">

        {currentWord.word}

      </div>

      <button
        className="btn btn-primary"
        onClick={handleNext}
      >

        {isLastWord
          ? 'Continue'
          : 'Next'}

      </button>

    </div>

  )

}