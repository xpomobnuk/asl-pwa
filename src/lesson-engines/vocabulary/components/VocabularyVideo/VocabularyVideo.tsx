import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from 'react'

import './VocabularyVideo.css'

type Props = {
  src: string
  autoPlay?: boolean
  onEnded?: () => void
}

export type VocabularyVideoHandle = {
  replay: () => void
  setPlaybackRate: (rate: number) => void
}

export const VocabularyVideo = forwardRef<
  VocabularyVideoHandle,
  Props
>(({
  src,
  autoPlay = false,
  onEnded,
}, ref) => {

  const videoRef =
    useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] =
    useState(false)

  useEffect(() => {

    setIsPlaying(false)

    if (videoRef.current) {
      videoRef.current.playbackRate = 1
    }

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

  useImperativeHandle(ref, () => ({

    replay() {

      if (!videoRef.current) {
        return
      }

      videoRef.current.currentTime = 0
      videoRef.current.play()

    },

    setPlaybackRate(rate: number) {

      if (!videoRef.current) {
        return
      }

      videoRef.current.playbackRate = rate

    },

  }))

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

})