import { useState } from 'react'

import { VocabularyIntro } from './components/VocabularyIntro/VocabularyIntro'

import type {
  VocabularyLessonData,
} from './types'

type Props = {
  lesson: VocabularyLessonData
}

type VocabularyStep =
  | 'intro'
  | 'recall'
  | 'review'
  | 'finish'

export const VocabularyLesson = ({
  lesson,
}: Props) => {

  const [step, setStep] =
    useState<VocabularyStep>('intro')

  switch (step) {

    case 'intro':

      return (

        <VocabularyIntro
          lesson={lesson}
          onComplete={() =>
            setStep('recall')
          }
        />

      )

    case 'recall':

      return (

        <div>

          Recall step

        </div>

      )

    case 'review':

      return (

        <div>

          Review step

        </div>

      )

    case 'finish':

      return (

        <div>

          Finish lesson

        </div>

      )

    default:

      return null

  }

}