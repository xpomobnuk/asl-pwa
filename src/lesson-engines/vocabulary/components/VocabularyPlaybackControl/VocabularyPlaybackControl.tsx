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

           {isSlow ? '0.75x' : '1x'}

        </button>

    )

}