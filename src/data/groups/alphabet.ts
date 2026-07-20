import type { ModuleGroup } from '../../types/module'

import {
  beginner1,
  beginner2,
  beginner3,
  beginner4,
  beginner5,
  beginner6,
  beginner7,
  beginner8,
  intermediate1,
  intermediate2,
} from '../../lessons/alphabet'

export const alphabetGroups: ModuleGroup[] = [

  {
    id: 'beginner',

    title: 'Beginner',

    description: 'Start from the basics',

    image: '/modules/abc/group-beginner.svg',

    color: 'blue',

    lessons: [
      beginner1,
      beginner2,
      beginner3,
      beginner4,
      beginner5,
      beginner6,
      beginner7,
      beginner8,
    ],
  },

  {
    id: 'intermediate',

    title: 'Intermediate',

    description: 'Build on your everyday skills',

    image: '/modules/abc/group-intermediate.svg',

    color: 'yellow',

    lessons: [
      intermediate1,
      intermediate2,
    ],
  },

  {
    id: 'pro',

    title: 'Pro',

    description: 'Master fluent signing',

    image: '/modules/abc/group-pro.svg',

    color: 'orange',

    lessons: [],
  },

]