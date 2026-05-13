import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import './Onboarding.css'

const questions = [
  {
    question: "What's your current experience level?",
    options: [
      "I'm new to ASL",
      "I know some common signs",
      "I can have basic conversations",
      "I can talk about various topics",
    ],
  },
  {
    type: 'time',
    question: 'Set Your Daily Learning Goal',
    subtitle:
      'Choose the time commitment that works best for you.',
    options: [
      '5 min',
      '15 min',
      '30 min',
      '45 min',
      '60 min',
      'Custom',
    ],
  },
  {
    question: "Why do you want to learn ASL?",
    options: [
      "For fun",
      "For work",
      "To communicate with someone",
      "Other",
    ],
  },
  {
    question: "What do you want to focus on?",
    options: [
      "Alphabet",
      "Words",
      "Phrases",
      "Conversation",
    ],
  },
  {
    question: "How did you hear about us?",
    options: [
      "Google",
      "Friends",
      "Social media",
      "Other",
    ],
  },
]

export const Onboarding = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  const current = questions[step]



  if (completed) {
    return (
      <div className="container onboarding">

        <div className="onboarding-complete">
          <h2 className="complete-title">
            You're all set
          </h2>

          <p className="complete-text">
            Thanks for completing this short survey.
            We’ll personalize your learning experience.
          </p>

          {/* IMAGE */}
          <div className="complete-image">
            <img src="/images/onboarding-complete.png" alt="complete" />
          </div>

          <button
            className="onboarding-next"
            onClick={async () => {
              const user = auth.currentUser

              if (!user) return

              const ref = doc(db, 'users', user.uid)

              await setDoc(
                ref,
                {
                  completedOnboarding: true,
                },
                { merge: true }
              )

              navigate('/')
            }}
          >
            Start Learning
          </button>
        </div>

      </div>
    )
  }

  return (

    <div className="onboarding container">

      {/* HEADER */}
      <div className="onboarding-header">
        <button onClick={() => navigate('/')}>✕</button>

        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${((step + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="onboarding-content">

        {/* SPECIAL TIME QUESTION */}
        {current.type === 'time' ? (
          <>
            <div className="time-header">

              <div>
                <h2 className="onboarding-title">
                  {current.question}
                </h2>

                <div className="onboarding-line" />

                <p className="onboarding-subtitle">
                  {current.subtitle}
                </p>
              </div>

              {/* ICON */}
              <div className="time-icon">
                <img src="/images/onboarding-clock.png" alt="onboarding-clock" />
              </div>

            </div>

            <div className="time-grid">
              {current.options.map((option, i) => (
                <div
                  key={i}
                  className={`time-option ${selected === i ? 'active' : ''
                    }`}
                  onClick={() => setSelected(i)}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="onboarding-title">
              {current.question}
            </h2>

            <div className="onboarding-line" />

            <div className="onboarding-options">
              {current.options.map((option, i) => (
                <div
                  key={i}
                  className={`option ${selected === i ? 'active' : ''
                    }`}
                  onClick={() => setSelected(i)}
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* BUTTON */}
      <button
        className="onboarding-next"
        onClick={() => {
          if (step === questions.length - 1) {
            setCompleted(true)
          } else {
            setSelected(null)
            setStep(step + 1)
          }
        }}
        disabled={selected === null}
      >
        Next
      </button>
    </div>
  )
}