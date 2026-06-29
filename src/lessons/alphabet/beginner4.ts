import type { Lesson } from '../../types/lesson'

export const beginner4: Lesson = {
  id: 'alphabet-beginner-04',

  slug: 'reading-more',
  title: 'Reading More',
  image: '/images/alphabet.jpg',

  description:
    'Learn more letters and read bigger words.',

  type: 'beginner',

  letters: [
    {
      letter: 'D',
      video: '/videos/d.mp4',
    },

    {
      letter: 'H',
      video: '/videos/h.mp4',
    },

    {
      letter: 'I',
      video: '/videos/i.mp4',
    },
  ],

  words: [
    {
      word: 'HIDE',
      letters: [
        'H',
        'I',
        'D',
        'E',
      ],
    },

    {
      word: 'HOME',
      letters: [
        'H',
        'O',
        'M',
        'E',
      ],
    },

    {
      word: 'TIME',
      letters: [
        'T',
        'I',
        'M',
        'E',
      ],
    },

    {
      word: 'MADE',
      letters: [
        'M',
        'A',
        'D',
        'E',
      ],
    },

    {
      word: 'HEAD',
      letters: [
        'H',
        'E',
        'A',
        'D',
      ],
    },
  ],
}