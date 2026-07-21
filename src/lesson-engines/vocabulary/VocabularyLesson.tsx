import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { VocabularyIntro } from './components/VocabularyIntro/VocabularyIntro'
import { VocabularyRecall } from './components/VocabularyRecall/VocabularyRecall'

import type {
  VocabularyLessonData,
} from '../../types/lesson'

type Props = {
  lesson: VocabularyLessonData
}

type VocabularyStep =
  | 'intro'
  | 'recall'
  | 'finish'

export const VocabularyLesson = ({
  lesson,
}: Props) => {

  const [step, setStep] =
    useState<VocabularyStep>('intro')

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