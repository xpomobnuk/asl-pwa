export const getLessonResult = (
  correct: number,
  total: number
) => {
  const accuracy =
    total > 0
      ? Math.round(
          (correct / total) * 100
        )
      : 0

  let reward = 2

  if (accuracy >= 50) reward = 5
  if (accuracy >= 75) reward = 8
  if (accuracy >= 90) reward = 10

  let title = 'Keep Going!'
  let text =
    'Every attempt helps you learn. Review the lesson and try again.'

  if (accuracy >= 50) {
    title = 'Great Job!'
    text =
      "You're making good progress. Keep practicing."
  }

  if (accuracy >= 75) {
    title = 'Excellent Work!'
    text =
      'You know this lesson really well. Keep it up.'
  }

  if (accuracy >= 90) {
    title = 'Outstanding!'
    text =
      "Perfect performance. You're ready for the next challenge."
  }

  const accuracyClass =
    accuracy < 50
      ? 'red'
      : accuracy < 75
      ? 'orange'
      : 'green'

  let heroImage =
    '/characters/hero_1.png'

  if (accuracy >= 50) {
    heroImage =
      '/characters/hero_3.png'
  }

  if (accuracy >= 75) {
    heroImage =
      '/characters/hero_2.png'
  }

  return {
    accuracy,
    reward,
    title,
    text,
    accuracyClass,
    heroImage,
  }
}