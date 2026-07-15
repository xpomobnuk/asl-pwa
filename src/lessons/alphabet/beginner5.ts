import type { AlphabetLessonData } from '../../types/lesson'

export const beginner5: AlphabetLessonData = {
  id: 'alphabet-beginner-05',

  slug: 'everyday-signs',
  title: 'Everyday Signs',
  image: '/modules/abc/beginner/everyday-signs.svg',

  description:
    'Learn everyday words.',

  type: 'beginner',
  engine: "alphabet",

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