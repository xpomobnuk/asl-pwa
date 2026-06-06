import { useNavigate } from 'react-router-dom'
import './Welcome.css'

export const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className="container welcome-page">

      <div className="welcome-card">

        <h1 className="welcome-title">
          Start. Learn. Improve!
        </h1>

        <div className="welcome-line" />

        <p className="welcome-text">
          Start with vocabulary, move to sentences and
          then practice with mixed exercises.
        </p>

        <div className="welcome-image">
          <img
            src="/images/Amy.png"
            alt="welcome"
          />
        </div>

        <button
          className="welcome-button"
          onClick={() => navigate('/onboarding')}
        >
          Get Started
        </button>

      </div>

    </div>
  )
}