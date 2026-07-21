import './VocabularyPlaybackControl.css'

type Props = {
    isSlow: boolean
    onToggle: () => void
}

export const VocabularyPlaybackControl = ({
    isSlow,
    onToggle,
}: Props) => {

    return (

        <button
            className={`btn btn-secondary vocabulary-playback-btn ${
                isSlow ? 'active' : ''
            }`}
            onClick={onToggle}
        >
           <img src="/icons/slow.svg" alt="slow" />
           {isSlow ? '0.6x' : '1x'}

        </button>

    )

}