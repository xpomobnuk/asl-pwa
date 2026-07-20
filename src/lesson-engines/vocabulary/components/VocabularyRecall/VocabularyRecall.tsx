import { useState } from 'react'

import { VocabularyVideo } from '../VocabularyVideo/VocabularyVideo'

import type {
    VocabularyLessonData,
} from '../../../../types/lesson'

import './VocabularyRecall.css'

type Props = {

    lesson: VocabularyLessonData

    onComplete: (
        failedWords: VocabularyLessonData['words']
    ) => void

}

export const VocabularyRecall = ({
    lesson,
    onComplete,
}: Props) => {

    const [state, setState] =
        useState<'question' | 'answer'>(
            'question'
        )

    const [currentIndex, setCurrentIndex] =
        useState(0)

    type AnswerDisplay =
        | 'hidden'
        | 'hint'
        | 'answer'

    const [answerDisplay, setAnswerDisplay] =
        useState<AnswerDisplay>('hidden')

    const [failedWords, setFailedWords] =
        useState<VocabularyLessonData['words']>([])

    const currentWord =
        lesson.words[currentIndex]

    const isLastWord =
        currentIndex === lesson.words.length - 1


    const handleNext = () => {

        setCurrentIndex(prev => prev + 1)

        setState('question')

        setAnswerDisplay('hidden')

    }

    const handleNotYet = () => {

        const updatedFailedWords = [

            ...failedWords,

            currentWord,

        ]

        if (isLastWord) {

            onComplete(updatedFailedWords)

            return

        }

        setFailedWords(updatedFailedWords)

        handleNext()

    }

    const handleNextAfterRemembered = () => {

        if (isLastWord) {

            onComplete(failedWords)

            return

        }

        handleNext()

    }

    const handleRemembered = () => {

        setState('answer')

        setAnswerDisplay('answer')

    }

    return (

        <div className="vocabulary-recall">

            <div className="vocabulary-progress">

                {currentIndex + 1}
                {' / '}
                {lesson.words.length}

            </div>

            <div className="vocabulary-card">

                <VocabularyVideo
                    src={currentWord.video}
                />

                <div
                    className={`vocabulary-answer-box ${answerDisplay === 'answer'
                        ? 'success'
                        : ''
                        }`}
                >

                    <div className="vocabulary-answer-text">

                        {answerDisplay === 'hidden' && '?'}

                        {answerDisplay === 'hint' && (

                            <>
                                {currentWord.word[0].toUpperCase()}
                                {'_'.repeat(currentWord.word.length - 1)}
                            </>

                        )}

                        {answerDisplay === 'answer' && (

                            <span className="correct-word">

                                {currentWord.word.toUpperCase()}

                            </span>

                        )}

                    </div>

                </div>

                <div className="vocabulary-tools">

                    <button
                        className={`vocabulary-hint-btn ${state === 'answer'
                                ? 'btn-hidden'
                                : ''
                            }`}
                        onClick={() => setAnswerDisplay('hint')}
                    >

                        💡 Hint

                    </button>

                </div>

            </div>

            <div className="vocabulary-recall-actions">

                <button
                    className={`btn btn-secondary ${state === 'answer'
                        ? 'btn-hidden'
                        : ''
                        }`}
                    onClick={handleNotYet}
                >

                    Not Yet

                </button>

                <button
                    className="btn btn-primary"
                    onClick={
                        state === 'question'
                            ? handleRemembered
                            : handleNextAfterRemembered
                    }
                >

                    {state === 'question'
                        ? 'Remembered'
                        : isLastWord
                            ? 'Finish Recall'
                            : 'Next Sign →'}

                </button>

            </div>

        </div>

    )

}

