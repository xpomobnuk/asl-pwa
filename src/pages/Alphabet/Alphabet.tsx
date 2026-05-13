import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { alphabet } from '../../data/alphabet'

import './Alphabet.css'

export const Alphabet = () => {
  const navigate = useNavigate()

  // 🔥 активная буква
  const [activeLetter, setActiveLetter] = useState(alphabet[0])

  return (
    <div className="container alphabet-page">

      {/* HEADER */}
      <div className="alphabet-header">

        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1 className="alphabet-title">
          ASL Alphabet
        </h1>

      </div>

      {/* ACTIVE VIDEO */}
      <div className="alphabet-video-wrapper">
        <video 
          src={activeLetter.video}
          autoPlay
          loop
          muted
          playsInline
          className="alphabet-video"
        />
      </div>

      {/* LETTERS GRID */}
      <div className="alphabet-grid">

        {alphabet.map((item) => (
          <button
            key={item.letter}
            className={`alphabet-item ${
              activeLetter.letter === item.letter
                ? 'active'
                : ''
            }`}
            onClick={() => setActiveLetter(item)}
          >
            {item.letter}
          </button>
        ))}

      </div>

    </div>
  )
}