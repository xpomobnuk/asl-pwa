import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Submodule.css'

import { auth, db } from '../../firebase'
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

const blocks = [
  {
    id: 'block-1',
    title: 'A - H',
    items: [
      { letter: 'A', video: '/videos/a.mp4' },
      { letter: 'B', video: '/videos/b.mp4' },
      { letter: 'C', video: '/videos/c.mp4' },
      { letter: 'D', video: '/videos/d.mp4' },
      { letter: 'E', video: '/videos/e.mp4' },
      { letter: 'F', video: '/videos/f.mp4' },
      { letter: 'G', video: '/videos/g.mp4' },
      { letter: 'H', video: '/videos/h.mp4' },
    ],
  },
  {
    id: 'block-2',
    title: 'I - P',
    items: [
      { letter: 'I', video: '/videos/i.mp4' },
      { letter: 'J', video: '/videos/j.mp4' },
      { letter: 'K', video: '/videos/k.mp4' },
      { letter: 'L', video: '/videos/l.mp4' },
      { letter: 'M', video: '/videos/m.mp4' },
      { letter: 'N', video: '/videos/n.mp4' },
      { letter: 'O', video: '/videos/o.mp4' },
      { letter: 'P', video: '/videos/p.mp4' },
    ],
  },
  {
    id: 'block-3',
    title: 'Q - Z',
    items: [
      { letter: 'Q', video: '/videos/q.mp4' },
      { letter: 'R', video: '/videos/r.mp4' },
      { letter: 'S', video: '/videos/s.mp4' },
      { letter: 'T', video: '/videos/t.mp4' },
      { letter: 'U', video: '/videos/u.mp4' },
      { letter: 'V', video: '/videos/v.mp4' },
      { letter: 'W', video: '/videos/w.mp4' },
      { letter: 'X', video: '/videos/x.mp4' },
      { letter: 'Y', video: '/videos/y.mp4' },
      { letter: 'Z', video: '/videos/z.mp4' },
    ],
  },
]

const shuffle = (array: any[]) => {
  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

export const ABCCards = () => {
  const navigate = useNavigate()

  const [blockIndex, setBlockIndex] = useState(0)
  const currentBlock = blocks[blockIndex]

  const [mode, setMode] = useState<
    'learn' | 'ready' | 'quiz' | 'finished'
  >('learn')

  const [index, setIndex] = useState(0)

  const [quizData, setQuizData] = useState<
    typeof currentBlock.items
  >([])

  const [options, setOptions] = useState<string[]>([])

  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)

  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const generateOptions = (correct: string) => {
    const letters = currentBlock.items
      .map((l) => l.letter)
      .filter((l) => l !== correct)

    const random3 = shuffle(letters).slice(0, 3)

    return shuffle([correct, ...random3])
  }

  useEffect(() => {
    if (mode === 'quiz' && quizData.length) {
      const correct = quizData[index].letter
      setOptions(generateOptions(correct))
    }
  }, [index, mode, quizData])

  const startQuiz = () => {
    const shuffled = shuffle(currentBlock.items)

    setQuizData(shuffled)
    setMode('quiz')
    setIndex(0)
  }

  const nextQuiz = () => {
    setSelected(null)
    setAnswered(false)

    if (index === quizData.length - 1) {
      if (blockIndex < blocks.length - 1) {
        setBlockIndex((prev) => prev + 1)
        setMode('learn')
        setIndex(0)
      } else {
        setMode('finished')
      }
    } else {
      setIndex((prev) => prev + 1)
    }
  }

  const progress = () => {
    if (mode === 'learn') return 0
    if (mode === 'quiz')
      return ((index + 1) / quizData.length) * 100

    return 100
  }

  const accuracy =
    totalQuestions > 0
      ? Math.round(
          (totalCorrect / totalQuestions) * 100
        )
      : 0

  let reward = 2

  if (accuracy >= 50) reward = 5
  if (accuracy >= 75) reward = 8
  if (accuracy >= 90) reward = 10

  let resultTitle = 'Keep Going!'
  let resultText =
    'Every attempt helps you learn. Review the lesson and try again.'

  if (accuracy >= 50) {
    resultTitle = 'Great Job!'
    resultText =
      "You're making good progress. Keep practicing."
  }

  if (accuracy >= 75) {
    resultTitle = 'Excellent Work!'
    resultText =
      'You know this lesson really well. Keep it up.'
  }

  if (accuracy >= 90) {
    resultTitle = 'Outstanding!'
    resultText =
      "Perfect performance. You're ready for the next challenge."
  }

  const accuracyClass =
    accuracy < 50
      ? 'red'
      : accuracy < 75
      ? 'orange'
      : 'green'

  
  let heroImage = '/characters/hero_1.png'

  if (accuracy >= 50) {
    heroImage = '/characters/hero_3.png'
  }

  if (accuracy >= 75) {
    heroImage = '/characters/hero_2.png'
  }    







  const saveReward = async () => {
    const user = auth.currentUser

    if (!user) return

    try {
      const ref = doc(db, 'users', user.uid)

      const snap = await getDoc(ref)

      if (!snap.exists()) return

      const data = snap.data()

      const currentXp = data.xp ?? 0
      const currentEnergy = data.energy ?? 5

      await updateDoc(ref, {
        xp: currentXp + reward,
        energy: currentEnergy - 1,
      })

      console.log(
        `Reward saved: +${reward} XP, -1 Energy`
      )

    } catch (error) {
      console.error(error)
    }
  }





  return (
    <div className="container submodule">

      <div className="submodule-header">
        <button onClick={() => navigate(-1)}>
          ✕
        </button>

        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${progress()}%`,
            }}
          />
        </div>
      </div>

      {/* LEARN */}
      {mode === 'learn' && (
        <>
          <h2 className="learn-title">
            {currentBlock.title}
          </h2>

          <div className="learn-list">
            {currentBlock.items.map((item) => (
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
            onClick={() => setMode('ready')}
          >
            Continue
          </button>
        </>
      )}

      {/* READY */}
      {mode === 'ready' && (
        <div className="center-screen">
          <h2>
            Ready to test yourself?
          </h2>

          <button
            className="next-btn"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      )}

      {/* QUIZ */}
      {mode === 'quiz' && (
        <>
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
                opt === quizData[index].letter

              const isSelected =
                selected === opt

              return (
                <div
                  key={opt}
                  className={`option
                    ${isSelected ? 'selected' : ''}
                    ${answered && isCorrect ? 'correct' : ''}
                    ${answered && isSelected && !isCorrect ? 'wrong' : ''}
                  `}
                  onClick={() => {
                    if (answered) return

                    setSelected(opt)
                    setAnswered(true)

                    if (
                      opt ===
                      quizData[index].letter
                    ) {
                      setTotalCorrect(
                        (prev) => prev + 1
                      )
                    }

                    setTotalQuestions(
                      (prev) => prev + 1
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
            disabled={!answered}
            onClick={nextQuiz}
          >
            Next
          </button>
        </>
      )}

      {/* FINISHED */}
      {mode === 'finished' && (
        <div className="results-screen">

          <div className="results-image">
          <img
            src={heroImage}
            alt="hero"
          />
        </div>

          <h2 className="results-title">
            {resultTitle}
          </h2>

          <div className="results-line" />

          <p className="results-text">
            {resultText}
          </p>

          <div className="results-stats">

            <div className="stat-card">
              <div className="stat-label">
                Correct
              </div>

              <div className="stat-value">
                {totalCorrect}/{totalQuestions}
              </div>
            </div>

            <div className="stat-card reward">
              <div className="stat-label">
                Reward
              </div>

              <div className="stat-value">
                {reward} XP
              </div>
            </div>

            <div
              className={`stat-card ${accuracyClass}`}
            >
              <div className="stat-label">
                Accuracy
              </div>

              <div className="stat-value">
                {accuracy}%
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

                await saveReward()

                navigate('/')
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