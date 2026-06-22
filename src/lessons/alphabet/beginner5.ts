import type { Lesson } from '../types'

export const beginner5: Lesson = {
  id: 'abc-beginner-5',

  title: '🌱 Beginner 5',

  description:
    'Add useful letters and build everyday words.',

  type: 'beginner',

  letters: [
    {
      letter: 'B',
      video: '/videos/b.mp4',
    },

    {
      letter: 'F',
      video: '/videos/f.mp4',
    },

    {
      letter: 'U',
      video: '/videos/u.mp4',
    },
  ],

  words: [
    {
      word: 'FUN',
      letters: [
        'F',
        'U',
        'N',
      ],
    },

    {
      word: 'BUFF',
      letters: [
        'B',
        'U',
        'F',
        'F',
      ],
    },

    {
      word: 'TUB',
      letters: [
        'T',
        'U',
        'B',
      ],
    },

    {
      word: 'BAT',
      letters: [
        'B',
        'A',
        'T',
      ],
    },

    {
      word: 'ABOUT',
      letters: [
        'A',
        'B',
        'O',
        'U',
        'T',
      ],
    },
  ],
}