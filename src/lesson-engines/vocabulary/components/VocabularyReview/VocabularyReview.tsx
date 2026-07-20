import { useState } from 'react'

import { VocabularyVideo } from '../VocabularyVideo/VocabularyVideo'

import type {
  VocabularyLessonData,
} from '../../types'

import './VocabularyReview.css'

type Props = {
  failedWords: VocabularyLessonData['words']
  onComplete: () => void
}

export const VocabularyReview = ({
  failedWords,
  onComplete,
}: Props) => {


  const [currentIndex, setCurrentIndex] =
    useState(0)

  const currentWord =
    failedWords[currentIndex]

  const isLastWord =
    currentIndex === failedWords.length - 1

  const handleNext = () => {

    if (!isLastWord) {

      setCurrentIndex(prev => prev + 1)

      return

    }

    onComplete()

  }

  return (

    <div className="vocabulary-review">

      <div className="vocabulary-progress">

        Review {currentIndex + 1}
        {' / '}
        {failedWords.length}

      </div>

      <div className="vocabulary-card">

        <VocabularyVideo
          src={currentWord.video}
        />

        <div className="vocabulary-word">

          {currentWord.word.toUpperCase()}

        </div>

        <p className="vocabulary-caption">

          Great effort! Every sign you review
          helps build long-term memory.

        </p>

      </div>

      <div className="vocabulary-action">

        <button
                    className='btn btn-secondary btn-hidden'
                >

                    Not Yet

                </button>

        <button
          className="btn btn-primary"
          onClick={handleNext}
        >

          {isLastWord
            ? 'Finish'
            : 'Next Sign →'}

        </button>

      </div>

    </div>

  )

}