import { useState, useEffect } from 'react'

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
  const [videoFinished, setVideoFinished] =
    useState(false)

  const [canContinue, setCanContinue] =
    useState(false)

  const currentWord =
    lesson.words[currentIndex]

  const isLastWord =
    currentIndex === lesson.words.length - 1

  const handleNext = () => {

    if (!isLastWord) {

      setVideoFinished(false)

      setCanContinue(false)

      setCurrentIndex(prev => prev + 1)

      return

    }

    onComplete()

  }

  useEffect(() => {

    if (!videoFinished) {
      return
    }

    const timer = setTimeout(() => {

      setCanContinue(true)

    }, 180)

    return () => clearTimeout(timer)

  }, [videoFinished])

  return (

    <div className="vocabulary-intro">

      <div className="vocabulary-progress">

        <div className="vocabulary-progress-top">

          <span>

            {currentIndex + 1} of {lesson.words.length}

          </span>

          <span>

            {Math.round(
              ((currentIndex + 1) / lesson.words.length) * 100
            )}%

          </span>

        </div>

        <div className="vocabulary-progress-track">

          <div
            className="vocabulary-progress-fill"
            style={{
              width: `${((currentIndex + 1) / lesson.words.length) * 100
                }%`,
            }}
          />

        </div>

      </div>

      <div className='vocabulary-card'>
        <VocabularyVideo
          src={currentWord.video}
          onEnded={() => {

            setVideoFinished(true)

          }}
        />

        <div className="vocabulary-word">

          {currentWord.word.toUpperCase()}

        </div>

        <p className="vocabulary-caption">

          Watch the sign carefully.

        </p>
      </div>

      <div className="vocabulary-action">

        <div
          className={`vocabulary-hint ${canContinue ? 'hide' : ''
            }`}
        >

          Watch the full sign to continue

        </div>

        <button
          className={`btn btn-primary vocabulary-next-button ${canContinue ? 'show' : ''
            }`}
          onClick={handleNext}
        >

          {isLastWord
            ? 'Continue'
            : 'Next Sign'}

        </button>

      </div>

    </div>

  )

}