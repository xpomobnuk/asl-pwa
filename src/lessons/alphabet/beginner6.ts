import type { Lesson } from '../../types/lesson'

export const beginner6: Lesson = {
  id: 'alphabet-beginner-06',

  slug: 'quick-recognition',
  title: 'Quick Recognition',
  image: '/modules/abc/beginner/quick-recognition.svg',

  description:
    'Practice common words.',

  type: 'beginner',

  letters: [
    {
      letter: 'G',
      video: '/videos/g.mp4',
    },

    {
      letter: 'K',
      video: '/videos/k.mp4',
    },

    {
      letter: 'Y',
      video: '/videos/y.mp4',
    },
  ],

  words: [
    {
      word: 'KEY',
      letters: [
        'K',
        'E',
        'Y',
      ],
    },

    {
      word: 'GAME',
      letters: [
        'G',
        'A',
        'M',
        'E',
      ],
    },

    {
      word: 'GYM',
      letters: [
        'G',
        'Y',
        'M',
      ],
    },

    {
      word: 'GO',
      letters: [
        'G',
        'O',
      ],
    },

    {
      word: 'TAKE',
      letters: [
        'T',
        'A',
        'K',
        'E',
      ],
    },
  ],
}