import { useParams, useNavigate } from 'react-router-dom'
import { alphabet } from '../../data/alphabet'
import './Letter.css'

export const Letter = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const letterData = alphabet.find(
    (l) => l.letter.toLowerCase() === id?.toLowerCase()
  )

  if (!letterData) {
    return <div className="container">Not found</div>
  }

  return (
    <div className="container letter-page">

      <button
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="letter-wrapper">
        <h1 className="letter-title">{letterData.title}</h1>

        <p className="letter-description">
          {letterData.description}
        </p>

        <video
          src={letterData.video}
          controls
          className="video-player"
        />
      </div>
    </div>
  )
}