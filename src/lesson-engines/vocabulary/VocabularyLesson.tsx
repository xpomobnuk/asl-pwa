import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { VocabularyIntro } from './components/VocabularyIntro/VocabularyIntro'
import { VocabularyRecall } from './components/VocabularyRecall/VocabularyRecall'
import { VocabularyReview } from './components/VocabularyReview/VocabularyReview'

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

  const [failedWords, setFailedWords] =
    useState<VocabularyLessonData['words']>([])

  const navigate = useNavigate()

  useEffect(() => {

    if (step !== 'finish') {
      return
    }

    navigate('/module/zoo')

  }, [step, navigate])

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

        <VocabularyRecall
          lesson={lesson}
          onComplete={(failedWords) => {

            if (failedWords.length === 0) {

              setStep('finish')

              return

            }

            setFailedWords(failedWords)

            setStep('review')

          }}
        />

      )

    case 'review':

      return (

        <VocabularyReview
          failedWords={failedWords}
          onComplete={() =>
            setStep('finish')
          }
        />

      )

    case 'finish':

      return null

    default:

      return null

  }

}