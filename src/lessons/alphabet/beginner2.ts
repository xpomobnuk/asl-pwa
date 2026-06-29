import type { Lesson } from '../../types/lesson'

export const beginner2: Lesson = {
  id: 'alphabet-beginner-02',

  slug: 'growing-vocabulary',
  title: 'Growing Vocabulary',
  image:
    '/images/alphabet.jpg',

  description:
    'Expand your alphabet with new letters and words.',

  type: 'beginner',

  letters: [
    {
      letter: 'N',
      video: '/videos/n.mp4',
    },

    {
      letter: 'P',
      video: '/videos/p.mp4',
    },

    {
      letter: 'S',
      video: '/videos/s.mp4',
    },
  ],

  words: [
    {
      word: 'STOP',
      letters: [
        'S',
        'T',
        'O',
        'P',
      ],
    },

    {
      word: 'POST',
      letters: [
        'P',
        'O',
        'S',
        'T',
      ],
    },

    {
      word: 'SPOT',
      letters: [
        'S',
        'P',
        'O',
        'T',
      ],
    },

    {
      word: 'SNAP',
      letters: [
        'S',
        'N',
        'A',
        'P',
      ],
    },

    {
      word: 'SOON',
      letters: [
        'S',
        'O',
        'O',
        'N',
      ],
    },
  ],
}