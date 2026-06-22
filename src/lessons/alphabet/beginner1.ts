import type { Lesson } from '../types'

export const beginner1: Lesson = {
  id: 'abc-beginner-1',

  title: '🌱 Beginner 1',

  description:
    'Learn your first letters and words.',

  type: 'beginner',

  letters: [
    {
      letter: 'A',
      video: '/videos/a.mp4',
    },

    {
      letter: 'C',
      video: '/videos/c.mp4',
    },

    {
      letter: 'O',
      video: '/videos/o.mp4',
    },

    {
      letter: 'T',
      video: '/videos/t.mp4',
    },

    {
      letter: 'M',
      video: '/videos/m.mp4',
    },
  ],

  words: [
    {
      word: 'CAT',
      letters: ['C', 'A', 'T'],
    },

    {
      word: 'MAT',
      letters: ['M', 'A', 'T'],
    },

    {
      word: 'TOM',
      letters: ['T', 'O', 'M'],
    },

    {
      word: 'MOM',
      letters: ['M', 'O', 'M'],
    },

    {
      word: 'ACT',
      letters: ['A', 'C', 'T'],
    },
  ],
}