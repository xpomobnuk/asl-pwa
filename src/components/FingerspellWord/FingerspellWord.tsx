import { useEffect, useState } from 'react'
import './FingerspellWord.css'

 type Props = {
      letters: string[]
      word?: string
  }

export const FingerspellWord = ({
  letters,
  word,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setCurrentIndex(0)
  }, [letters])

  const currentLetter = letters[currentIndex].toLowerCase()

  const handleVideoEnd = () => {
    const isLastLetter = currentIndex === letters.length - 1

    setFade(true)

    setTimeout(() => {

      setCurrentIndex((prev) => {

        if (isLastLetter) {
          return 0
        }

        return prev + 1
      })

      setTimeout(() => {
        setFade(false)
      }, 50)

    }, isLastLetter ? 1500 : 300)
  }

  return (
    <div className="fingerspell-word">

    <video
      key={currentLetter}
      className={`fingerspell-video ${
        fade ? 'fade' : ''
      }`}
      src={`/videos/${currentLetter}.mp4`}
      autoPlay
      muted
      playsInline
      onEnded={handleVideoEnd}
    />

    {word && (
      <div className="fingerspell-word-label">
        {word}
      </div>
    )}

      <div className="fingerspell-progress">

        {letters.map((letter, index) => (
          <div
            key={letter}
            className={`fingerspell-dot ${
              index === currentIndex
                ? 'active'
                : ''
            }`}
          />
        ))}

      </div>

    </div>
  )
}