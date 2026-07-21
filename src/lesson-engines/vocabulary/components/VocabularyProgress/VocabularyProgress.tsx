import './VocabularyProgress.css'

type VocabularyProgressProps = {
    current: number
    total: number
}

export function VocabularyProgress({
    current,
    total,
}: VocabularyProgressProps) {

    const percent = Math.round((current / total) * 100)

    return (

        <div className="vocabulary-progress">

            <div className="vocabulary-progress-top">

                <span>

                    {current} of {total}

                </span>

                <span>

                    {percent}%

                </span>

            </div>

            <div className="vocabulary-progress-track">

                <div
                    className="vocabulary-progress-fill"
                    style={{
                        width: `${percent}%`,
                    }}
                />

            </div>

        </div>

    )

}