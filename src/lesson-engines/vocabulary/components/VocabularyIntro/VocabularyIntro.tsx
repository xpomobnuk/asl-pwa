import { useRef, useState } from 'react'
import { VocabularyProgress } from '../VocabularyProgress/VocabularyProgress'
import { VocabularyPlaybackControl } from '../VocabularyPlaybackControl/VocabularyPlaybackControl'

import {
  VocabularyVideo,
  type VocabularyVideoHandle,
} from '../VocabularyVideo/VocabularyVideo'

import type {
  VocabularyLessonData,
} from '../../../../types/lesson'

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

  const [isSlow, setIsSlow] =
    useState(false)

  const videoRef =
    useRef<VocabularyVideoHandle>(null)


  const currentWord =
    lesson.words[currentIndex]

  const isLastWord =
    currentIndex === lesson.words.length - 1

  const handleNext = () => {
    if (!isLastWord) {
      setCurrentIndex(prev => prev + 1)
      setIsSlow(false)
      return
    }

    onComplete()
  }

  return (

    <div className="vocabulary-intro">

      <VocabularyProgress
        current={currentIndex + 1}
        total={lesson.words.length}
      />
      <div className='vocabulary-card'>
        <VocabularyVideo
          ref={videoRef}
          src={currentWord.video}
        />

        <div className="vocabulary-word">

          {currentWord.word.toUpperCase()}

        </div>

        <p className="vocabulary-caption">

          Watch the sign carefully.

        </p>
      </div>

      <div className="vocabulary-action">


        <div className="vocabulary-tools">

          <button
            className="btn btn-secondary vocabulary-replay-button btn-replay"
            onClick={() => videoRef.current?.replay()}
          >
            <img src="/icons/replay.svg" alt="replay" />
            Replay
          </button>

          <VocabularyPlaybackControl
            isSlow={isSlow}
            onToggle={() => {

              const nextIsSlow = !isSlow

              videoRef.current?.setPlaybackRate(
                nextIsSlow ? 0.6 : 1
              )

              setIsSlow(nextIsSlow)

            }}
          />

        </div>

        <button
          className="btn btn-primary vocabulary-next-button"
          onClick={handleNext}
        >
          {isLastWord ? 'Continue' : 'Next Sign →'}
        </button>

      </div>

    </div>

  )

}