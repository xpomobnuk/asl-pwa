import type { AlphabetLessonData } from '../../types/lesson'

export const intermediate1: AlphabetLessonData = {
  id: 'alphabet-intermediate-01',

  slug: 'everyday-words',
  title: 'Everyday Words',
  image: '/images/alphabet.jpg',

  description:
    'Practice reading complete everyday words.',

  type: 'intermediate',
  engine: "alphabet",

  letters: [],

  words: [
    {
      word: 'APPLE',
      letters: [
        'A',
        'P',
        'P',
        'L',
        'E',
      ],
    },

    {
      word: 'HOUSE',
      letters: [
        'H',
        'O',
        'U',
        'S',
        'E',
      ],
    },

    {
      word: 'PHONE',
      letters: [
        'P',
        'H',
        'O',
        'N',
        'E',
      ],
    },

    {
      word: 'WATER',
      letters: [
        'W',
        'A',
        'T',
        'E',
        'R',
      ],
    },

    {
      word: 'TRAIN',
      letters: [
        'T',
        'R',
        'A',
        'I',
        'N',
      ],
    },
  ],
}