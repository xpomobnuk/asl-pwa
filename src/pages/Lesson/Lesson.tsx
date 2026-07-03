import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { alphabetLessons } from '../../lessons/alphabet'
import { FingerspellWord } from '../../components/FingerspellWord/FingerspellWord'
import { saveReward } from '../../utils/rewards'
import { saveLessonResult } from '../../services/progress'
import { auth } from '../../firebase'
import { getLessonResult } from '../../utils/results'
import { ROUTES } from '../../routes'

import '../Submodule/Submodule.css'

export const Lesson = () => {
    const { lessonSlug } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const returnTo =
        location.state?.returnTo ??
        ROUTES.LEARN

    const [index, setIndex] =
        useState(0)

    const [selected, setSelected] =
        useState<string | null>(null)

    const [answered, setAnswered] =
        useState(false)

    const [options, setOptions] =
        useState<string[]>([])

    const [correctAnswers, setCorrectAnswers] =
        useState(0)

    const [totalAnswers, setTotalAnswers] =
        useState(0)

    const [wordIndex, setWordIndex] =
        useState(0)

    const lesson = alphabetLessons.find(
        (item) => item.slug === lessonSlug
    )

    if (!lesson) {
        return (
            <div className="container">
                Lesson not found
            </div>
        )
    }

    const [mode, setMode] = useState(
        lesson.type === 'intermediate'
            ? 'learn-words'
            : 'learn-letters'
    )

    const shuffle = (
        array: string[]
    ) => {
        const arr = [...array]

        for (
            let i = arr.length - 1;
            i > 0;
            i--
        ) {
            const j = Math.floor(
                Math.random() * (i + 1)
            )

                ;[arr[i], arr[j]] = [
                    arr[j],
                    arr[i],
                ]
        }

        return arr
    }

    const generateOptions = (
        correctLetter: string
    ) => {
        const letters =
            lesson.letters
                .map(
                    (item) => item.letter
                )
                .filter(
                    (item) =>
                        item !== correctLetter
                )

        const random3 =
            shuffle(letters).slice(
                0,
                3
            )

        return shuffle([
            correctLetter,
            ...random3,
        ])
    }

    const generateWordOptions = (
        correctWord: string
    ) => {
        const words = lesson.words
            .map((item) => item.word)
            .filter(
                (item) =>
                    item !== correctWord
            )

        const random3 =
            shuffle(words).slice(0, 3)

        return shuffle([
            correctWord,
            ...random3,
        ])
    }

    useEffect(() => {
        if (mode === 'quiz-letters') {
            setOptions(
                generateOptions(
                    lesson.letters[index]
                        .letter
                )
            )
        }

        if (mode === 'quiz-words') {
            setOptions(
                generateWordOptions(
                    lesson.words[wordIndex]
                        .word
                )
            )
        }
    }, [
        index,
        wordIndex,
        mode,
    ])

    const getProgress = () => {

        if (
            mode === 'learn-letters'
        ) {
            return 25
        }

        if (
            mode === 'quiz-letters'
        ) {
            return 50
        }

        if (
            mode === 'learn-words'
        ) {
            return 75
        }

        if (
            mode === 'quiz-words'
        ) {
            return 100
        }



        if (
            lesson.type ===
            'intermediate'
        ) {

            if (
                mode === 'learn-words'
            ) {
                return 50
            }

            if (
                mode === 'quiz-words'
            ) {
                return 100
            }
        }

        return 100
    }


    const result = getLessonResult(
        correctAnswers,
        totalAnswers
    )

    return (
        <div className="container submodule">

            <div className="submodule-header">

                <button
                    onClick={() => navigate(-1)}
                >
                    ✕
                </button>

                <div className="progress">

                    <div
                        className="progress-bar"
                        style={{
                            width: `${getProgress()}%`,
                        }}
                    />

                </div>

            </div>

            {mode === 'learn-letters' && (
                <>
                    <h2 className="learn-title">
                        {lesson.title}
                    </h2>

                    <div className="learn-list">

                        {lesson.letters.map((item) => (
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
                        ))}

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

            {mode === 'quiz-letters' && (
                <>
                    <h2 className="learn-title">
                        Guess the Letter
                    </h2>

                    <video
                        src={
                            lesson.letters[index]
                                .video
                        }
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
                                lesson.letters[index].letter

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
                ${answered && isCorrect
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

                                        if (answered)
                                            return

                                        setSelected(opt)
                                        setAnswered(true)

                                        setTotalAnswers(
                                            (prev) =>
                                                prev + 1
                                        )

                                        if (
                                            opt ===
                                            lesson.letters[
                                                index
                                            ].letter
                                        ) {
                                            setCorrectAnswers(
                                                (prev) =>
                                                    prev + 1
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
                        onClick={() => {

                            setSelected(null)
                            setAnswered(false)

                            if (
                                index ===
                                lesson.letters
                                    .length -
                                1
                            ) {
                                setMode('learn-words')
                                setIndex(0)
                                return
                            }

                            setIndex(
                                (prev) =>
                                    prev + 1
                            )
                        }}
                    >
                        Next
                    </button>

                </>
            )}


            {mode === 'learn-words' && (
                <>
                    <h2 className="learn-title">
                        Learn Words
                    </h2>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}
                    >
                        {lesson.words.map((item) => (
                            <FingerspellWord
                                key={item.word}
                                word={item.word}
                                letters={item.letters}
                            />
                        ))}
                    </div>

                    <button
                        className="next-btn"
                        onClick={() => {
                            setMode('quiz-words')
                            setIndex(0)
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
                        key={lesson.words[wordIndex].word}
                        word=""
                        letters={
                            lesson.words[wordIndex]
                                .letters
                        }
                    />

                    <div className="options-grid">

                        {options.map((opt) => {

                            const isCorrect =
                                opt ===
                                lesson.words[
                                    wordIndex
                                ].word

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
                ${answered && isCorrect
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

                                        if (answered)
                                            return

                                        setSelected(opt)
                                        setAnswered(true)

                                        setTotalAnswers(
                                            (prev) =>
                                                prev + 1
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
                        onClick={() => {

                            setSelected(null)
                            setAnswered(false)

                            if (
                                wordIndex ===
                                lesson.words.length - 1
                            ) {
                                setMode('finished')
                                return
                            }

                            setWordIndex(
                                (prev) =>
                                    prev + 1
                            )
                        }}
                    >
                        Next
                    </button>

                </>
            )}

            {mode === 'finished' && (
                <div className="results-screen">

                    <div className="results-image">
                        <img
                            src={result.heroImage}
                            alt="hero"
                        />
                    </div>

                    <h2 className="results-title">
                        {result.title}
                    </h2>

                    <div className="results-line" />

                    <p className="results-text">
                        {result.text}
                    </p>

                    <div className="results-stats">

                        <div className="stat-card">

                            <div className="stat-label">
                                Correct
                            </div>

                            <div className="stat-value">
                                {correctAnswers}/{totalAnswers}
                            </div>

                        </div>

                        <div className="stat-card reward">

                            <div className="stat-label">
                                Reward
                            </div>

                            <div className="stat-value">
                                {result.reward} XP
                            </div>

                        </div>

                        <div
                            className={`stat-card ${result.accuracyClass}`}
                        >

                            <div className="stat-label">
                                Accuracy
                            </div>

                            <div className="stat-value">
                                {result.accuracy}%
                            </div>

                        </div>

                    </div>

                    <div className="results-buttons">

                        <button
                            className="btn-secondary"
                            onClick={() =>
                                window.location.reload()
                            }
                        >
                            Try Again
                        </button>

                        <button
                            className="btn-primary"
                            onClick={async () => {

                                await saveReward(result.reward)

                                const user = auth.currentUser

                                if (user) {
                                    await saveLessonResult(
                                        user.uid,
                                        lesson.id,
                                        result.accuracy
                                    )
                                }

                                navigate(returnTo, {
                                    replace: true,
                                })
                            }}
                        >
                            Complete
                        </button>

                    </div>

                </div>
            )}



        </div>
    )
}