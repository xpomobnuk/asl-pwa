import type { Lesson } from '../types'

export const beginner7: Lesson = {
  id: 'abc-beginner-7',

  title: '🌱 Beginner 7',

  description:
    'Learn advanced letters and improve recognition.',

  type: 'beginner',

  letters: [
    {
      letter: 'V',
      video: '/videos/v.mp4',
    },

    {
      letter: 'W',
      video: '/videos/w.mp4',
    },

    {
      letter: 'J',
      video: '/videos/j.mp4',
    },
  ],

  words: [
    {
      word: 'WAVE',
      letters: [
        'W',
        'A',
        'V',
        'E',
      ],
    },

    {
      word: 'JAVA',
      letters: [
        'J',
        'A',
        'V',
        'A',
      ],
    },

    {
      word: 'VIEW',
      letters: [
        'V',
        'I',
        'E',
        'W',
      ],
    },

    {
      word: 'JAW',
      letters: [
        'J',
        'A',
        'W',
      ],
    },

    {
      word: 'MOVE',
      letters: [
        'M',
        'O',
        'V',
        'E',
      ],
    },
  ],
}