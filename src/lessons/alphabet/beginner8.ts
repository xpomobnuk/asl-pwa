import type { Lesson } from '../types'

export const beginner8: Lesson = {
  id: 'abc-beginner-8',

  title: '🌱 Beginner 8',

  description:
    'Complete the alphabet and master the final letters.',

  type: 'beginner',

  letters: [
    {
      letter: 'Q',
      video: '/videos/q.mp4',
    },

    {
      letter: 'X',
      video: '/videos/x.mp4',
    },

    {
      letter: 'Z',
      video: '/videos/z.mp4',
    },
  ],

  words: [
    {
      word: 'QUIZ',
      letters: [
        'Q',
        'U',
        'I',
        'Z',
      ],
    },

    {
      word: 'BOX',
      letters: [
        'B',
        'O',
        'X',
      ],
    },

    {
      word: 'ZERO',
      letters: [
        'Z',
        'E',
        'R',
        'O',
      ],
    },

    {
      word: 'FOX',
      letters: [
        'F',
        'O',
        'X',
      ],
    },

    {
      word: 'TAXI',
      letters: [
        'T',
        'A',
        'X',
        'I',
      ],
    },
  ],
}