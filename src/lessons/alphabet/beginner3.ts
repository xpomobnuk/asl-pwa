import type { Lesson } from '../../types/lesson'

export const beginner3: Lesson = {
  id: 'alphabet-beginner-03',

   slug: 'building-words',
   title: 'Building Words',
   image: '/images/alphabet.jpg',

  description:
    'Build longer words using familiar letters.',

  type: 'beginner',

  letters: [
    {
      letter: 'L',
      video: '/videos/l.mp4',
    },

    {
      letter: 'R',
      video: '/videos/r.mp4',
    },

    {
      letter: 'E',
      video: '/videos/e.mp4',
    },
  ],

  words: [
    {
      word: 'ROLE',
      letters: [
        'R',
        'O',
        'L',
        'E',
      ],
    },

    {
      word: 'MORE',
      letters: [
        'M',
        'O',
        'R',
        'E',
      ],
    },

    {
      word: 'LATE',
      letters: [
        'L',
        'A',
        'T',
        'E',
      ],
    },

    {
      word: 'REAL',
      letters: [
        'R',
        'E',
        'A',
        'L',
      ],
    },

    {
      word: 'TEAM',
      letters: [
        'T',
        'E',
        'A',
        'M',
      ],
    },
  ],
}