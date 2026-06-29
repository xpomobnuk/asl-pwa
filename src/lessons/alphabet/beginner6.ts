import type { Lesson } from '../../types/lesson'

export const beginner6: Lesson = {
  id: 'alphabet-beginner-06',

  slug: 'quick-recognition',
  title: 'Quick Recognition',
  image: '/images/alphabet.jpg',

  description:
    'Practice new letters in common short words.',

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