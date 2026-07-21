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

import './VocabularyRecall.css'

type Props = {

    lesson: VocabularyLessonData

    onComplete: () => void

}

export const VocabularyRecall = ({
    lesson,
    onComplete,
}: Props) => {

    const [currentIndex, setCurrentIndex] =
        useState(0)

    const [isSlow, setIsSlow] =
        useState(false)

    const videoRef =
        useRef<VocabularyVideoHandle>(null)

    type AnswerDisplay =
        | 'hidden'
        | 'hint'
        | 'answer'

    const [answerDisplay, setAnswerDisplay] =
        useState<AnswerDisplay>('hidden')

    const currentWord =
        lesson.words[currentIndex]

    const isLastWord =
        currentIndex === lesson.words.length - 1


    const handleNext = () => {

        setCurrentIndex(prev => prev + 1)

        setAnswerDisplay('hidden')

        setIsSlow(false)

    }

    const handleNextAfterRemembered = () => {

        if (isLastWord) {

            onComplete()

            return

        }

        handleNext()

    }

    return (

        <div className="vocabulary-recall">

            <VocabularyProgress
                current={currentIndex + 1}
                total={lesson.words.length}
            />

            <div className="vocabulary-card">

                <VocabularyVideo
                    ref={videoRef}
                    src={currentWord.video}
                />

                <div className="vocabulary-recall-panel">

                    {answerDisplay === 'hidden' && (

                        <>

                            <h2>

                                What does this sign mean?

                            </h2>

                            <p>

                                Try to recall the word.

                            </p>

                        </>

                    )}

                    {answerDisplay === 'hint' && (

                        <>

                            <div className="vocabulary-answer-text">

                                {currentWord.word[0].toUpperCase()}
                                {'_'.repeat(currentWord.word.length - 1)}

                            </div>

                            <p>

                                The word starts with{' '}

                                {currentWord.word[0].toUpperCase()}.

                            </p>

                        </>

                    )}

                    {answerDisplay === 'answer' && (

                        <>

                            <div className="correct-word">

                                {currentWord.word.toUpperCase()}

                            </div>

                            <p>

                                Watch the sign again and
                                compare it with your answer.

                            </p>

                        </>

                    )}

                </div>

            </div>

            <div className="vocabulary-recall-actions">

                <div className="vocabulary-recall-tools">

                    {answerDisplay === 'hidden' ? (

                        <button
                            className="btn btn-secondary vocabulary-hint-btn"
                            onClick={() => setAnswerDisplay('hint')}
                        >

                            💡 Hint

                        </button>

                    ) : (

                        <button
                            className="btn btn-secondary vocabulary-hint-btn btn-replay"
                            onClick={() =>
                                videoRef.current?.replay()
                            }
                        >
                            <img src="/icons/replay.svg" alt="replay" />
                            Replay

                        </button>

                    )}

                    <VocabularyPlaybackControl
                        isSlow={isSlow}
                        onToggle={() => {

                            const nextIsSlow = !isSlow

                            videoRef.current?.setPlaybackRate(
                                nextIsSlow ? 0.75 : 1
                            )

                            setIsSlow(nextIsSlow)

                        }}
                    />

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        if (answerDisplay === 'answer') {

                            handleNextAfterRemembered()

                            return

                        }

                        setAnswerDisplay('answer')

                    }}
                >

                    {answerDisplay === 'answer'
                        ? (
                            isLastWord
                                ? 'Finish Recall'
                                : 'Next Sign →'
                        )
                        : 'Show Answer'}

                </button>

            </div>

        </div>

    )

}

