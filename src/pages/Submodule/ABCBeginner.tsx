import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FingerspellWord } from '../../components/FingerspellWord/FingerspellWord'
import '../Submodule/Submodule.css'

const lesson = {
    letters: [
        { letter: 'A', video: '/videos/a.mp4' },
        { letter: 'C', video: '/videos/c.mp4' },
        { letter: 'O', video: '/videos/o.mp4' },
        { letter: 'T', video: '/videos/t.mp4' },
        { letter: 'M', video: '/videos/m.mp4' },
    ],

    words: [
        {
            word: 'CAT',
            letters: ['C', 'A', 'T'],
        },
        {
            word: 'MAT',
            letters: ['M', 'A', 'T'],
        },
        {
            word: 'TOM',
            letters: ['T', 'O', 'M'],
        },
        {
            word: 'MOM',
            letters: ['M', 'O', 'M'],
        },
        {
            word: 'ACT',
            letters: ['A', 'C', 'T'],
        },
    ],
}

type Mode =
    | 'learn-letters'
    | 'quiz-letters'
    | 'learn-words'
    | 'quiz-words'
    | 'finished'

const shuffle = (array: any[]) => {
    const arr = [...array]

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(
            Math.random() * (i + 1)
        )

            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }

    return arr
}

export const ABCBeginner = () => {
    const navigate = useNavigate()

    const [mode, setMode] =
        useState<Mode>('learn-letters')

    const [wordIndex, setWordIndex] =
        useState(0)

    const [wordSelected, setWordSelected] =
        useState<string | null>(null)

    const [wordAnswered, setWordAnswered] =
        useState(false)

    const [wordOptions, setWordOptions] =
        useState<string[]>([])

    const [correctAnswers, setCorrectAnswers] =
        useState(0)

    const [totalAnswers, setTotalAnswers] =
        useState(0)

    const [quizData] = useState(
        shuffle(lesson.letters)
    )

    const [index, setIndex] = useState(0)

    const [selected, setSelected] =
        useState<string | null>(null)

    const [answered, setAnswered] =
        useState(false)

    const [options, setOptions] =
        useState<string[]>([])

    const generateOptions = (
        correct: string
    ) => {
        const letters = lesson.letters
            .map((l) => l.letter)
            .filter((l) => l !== correct)

        const random3 = shuffle(
            letters
        ).slice(0, 3)

        return shuffle([
            correct,
            ...random3,
        ])
    }

    const generateWordOptions = (
        correctWord: string
    ) => {
        const words = lesson.words
            .map((w) => w.word)
            .filter(
                (w) => w !== correctWord
            )

        const random3 = shuffle(
            words
        ).slice(0, 3)

        return shuffle([
            correctWord,
            ...random3,
        ])
    }

    useEffect(() => {
    if (quizData.length) {
        setOptions(
        generateOptions(
            quizData[0].letter
        )
        )
    }
    }, [])

    const nextQuestion = () => {
        setSelected(null)
        setAnswered(false)

        if (index === quizData.length - 1) {
            setMode('learn-words')
            return
        }

        const nextIndex = index + 1

        setIndex(nextIndex)

        setOptions(
            generateOptions(
                quizData[nextIndex].letter
            )
        )
    }

    const nextWord = () => {
        setWordSelected(null)
        setWordAnswered(false)

        if (
            wordIndex ===
            lesson.words.length - 1
        ) {
            setMode('finished')
            return
        }

        const next =
            wordIndex + 1

        setWordIndex(next)

        setWordOptions(
            generateWordOptions(
                lesson.words[next].word
            )
        )
    }




    return (
        <div className="container submodule">

            <div className="submodule-header">

                <button
                    onClick={() => navigate(-1)}
                >
                    ✕
                </button>

            </div>

            {/* STEP 1 */}
            {mode === 'learn-letters' && (
                <>
                    <h2 className="learn-title">
                        Learn 5 Letters
                    </h2>

                    <div className="learn-list">

                        {lesson.letters.map(
                            (item) => (
                                <div
                                    key={item.letter}
                                    className="learn-card"
                                >
                                    <video
                                        src={item.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="video"
                                    />

                                    <div className="letter">
                                        {item.letter}
                                    </div>
                                </div>
                            )
                        )}

                    </div>

                    <button
                        className="next-btn"
                        onClick={() =>
                            setMode(
                                'quiz-letters'
                            )
                        }
                    >
                        Continue
                    </button>
                </>
            )}

            {/* STEP 2 */}
            {mode === 'quiz-letters' && (
                <>
                    <h2 className="learn-title">
                        Guess the Letter
                    </h2>

                    <video
                        src={quizData[index].video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="video"
                    />

                    <div className="options-grid">

                        {options.map((opt) => {
                            const isCorrect =
                                opt ===
                                quizData[index]
                                    .letter

                            const isSelected =
                                selected === opt

                            return (
                                <div
                                    key={opt}
                                    className={`option
                    ${isSelected
                                            ? 'selected'
                                            : ''
                                        }
                    ${answered &&
                                            isCorrect
                                            ? 'correct'
                                            : ''
                                        }
                    ${answered &&
                                            isSelected &&
                                            !isCorrect
                                            ? 'wrong'
                                            : ''
                                        }
                  `}
                                    onClick={() => {
                                        if (
                                            answered
                                        )
                                            return

                                        setSelected(opt)
                                        setAnswered(true)

                                        setTotalAnswers((prev) => prev + 1)
                                        if (
                                            opt === quizData[index].letter
                                        ) {
                                            setCorrectAnswers(
                                                (prev) => prev + 1
                                            )
                                        }
                                    }}
                                >
                                    {opt}
                                </div>
                            )
                        })}

                    </div>

                    <button
                        className="next-btn"
                        disabled={!answered}
                        onClick={nextQuestion}
                    >
                        Next
                    </button>
                </>
            )}

            {/* STEP 3 */}
            {mode === 'learn-words' && (
                <>
                    <h2 className="learn-title">
                        Learn Words
                    </h2>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection:
                                'column',
                            gap: '24px',
                        }}
                    >
                        {lesson.words.map(
                            (item) => (
                                <FingerspellWord
                                    key={item.word}
                                    word={item.word}
                                    letters={
                                        item.letters
                                    }
                                />
                            )
                        )}
                    </div>

                    <button
                        className="next-btn"
                        onClick={() => {
                            setMode('quiz-words')

                            setWordOptions(
                                generateWordOptions(
                                    lesson.words[0].word
                                )
                            )
                        }}
                    >
                        Continue
                    </button>

                </>
            )}



            {mode === 'quiz-words' && (
                <>
                    <h2 className="learn-title">
                        Guess the Word
                    </h2>

                    <FingerspellWord
                        key={
                            lesson.words[wordIndex]
                            .word
                        }
                        letters={
                            lesson.words[wordIndex]
                                .letters
                        }
                    />

                    <div className="options-grid">

                        {wordOptions.map((opt) => {
                            const isCorrect =
                                opt ===
                                lesson.words[wordIndex]
                                    .word

                            const isSelected =
                                wordSelected === opt

                            return (
                                <div
                                    key={opt}
                                    className={`option
              ${isSelected
                                            ? 'selected'
                                            : ''
                                        }
              ${wordAnswered &&
                                            isCorrect
                                            ? 'correct'
                                            : ''
                                        }
              ${wordAnswered &&
                                            isSelected &&
                                            !isCorrect
                                            ? 'wrong'
                                            : ''
                                        }
            `}
                                    onClick={() => {
                                        if (
                                            wordAnswered
                                        )
                                            return

                                        setWordSelected(
                                            opt
                                        )

                                        setWordAnswered(
                                            true
                                        )

                                        if (
                                            opt ===
                                            lesson.words[
                                                wordIndex
                                            ].word
                                        ) {
                                            setCorrectAnswers(
                                                (prev) =>
                                                    prev + 1
                                            )
                                        }

                                        setTotalAnswers(
                                            (prev) =>
                                                prev + 1
                                        )
                                    }}
                                >
                                    {opt}
                                </div>
                            )
                        })}

                    </div>

                    <button
                        className="next-btn"
                        disabled={!wordAnswered}
                        onClick={nextWord}
                    >
                        Next
                    </button>
                </>
            )}


            {mode === 'finished' && (
                <div className="center-screen">

                    <h2>
                        Beginner Lesson Complete
                    </h2>

                    <p>
                        Correct answers:
                        {' '}
                        {correctAnswers}
                        /
                        {totalAnswers}
                    </p>

                    <button
                        className="next-btn"
                        onClick={() =>
                            navigate('/')
                        }
                    >
                        Finish
                    </button>

                </div>
            )}


        </div>
    )
}