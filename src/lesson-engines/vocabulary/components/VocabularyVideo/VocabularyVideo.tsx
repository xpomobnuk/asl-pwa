import { useRef, useState } from 'react'

type Props = {
    src: string
    autoPlay?: boolean
}

export const VocabularyVideo = ({
    src,
}: Props) => {

    const videoRef =
        useRef<HTMLVideoElement>(null)

    const [isPlaying, setIsPlaying] =
        useState(false)

    const handlePlay = () => {

        if (!videoRef.current) {
            return
        }

        videoRef.current.currentTime = 0

        videoRef.current.play()

        setIsPlaying(true)

    }

    return (

        <div className="vocabulary-video-wrap">

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

                }}
            />

            {!isPlaying && (

                <button
                    className="vocabulary-video-overlay"
                    onClick={handlePlay}
                >

                    <img
                        src="/icons/video-play.png"
                        alt=""
                    />

                </button>

            )}

        </div>

    )

}