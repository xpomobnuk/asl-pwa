import { useRef, useState, useEffect } from 'react'

import './VocabularyVideo.css'

type Props = {
  src: string
  autoPlay?: boolean
  onEnded?: () => void
}

export const VocabularyVideo = ({
  src,
  autoPlay = false,
  onEnded,
}: Props) => {

  const videoRef =
    useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] =
    useState(false)

  useEffect(() => {

    if (!autoPlay || !videoRef.current) {
      return
    }

    videoRef.current.currentTime = 0
    videoRef.current.play()

  }, [src, autoPlay])

  const handlePlay = () => {

    if (!videoRef.current) {
      return
    }

    videoRef.current.currentTime = 0

    videoRef.current.play()

  }

  return (

    <div className="vocabulary-video-card">

      <video
        ref={videoRef}
        className="vocabulary-video"
        src={src}
        muted
        playsInline
        onPlay={() => {

          setIsPlaying(true)

        }}
        onEnded={() => {

          setIsPlaying(false)

          onEnded?.()

        }}
      />

      <button
        className={`vocabulary-video-overlay ${isPlaying ? 'hidden' : ''
          }`}
        onClick={handlePlay}
      >

        <div className="vocabulary-play-circle">

          <img
            src="/icons/play.svg"
            alt="Play"
          />

        </div>

      </button>

    </div>

  )

}