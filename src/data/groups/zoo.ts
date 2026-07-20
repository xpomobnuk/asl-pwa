import type { ModuleGroup } from '../../types/module'

import {
  zooIndexCards1,
} from '../../lessons/zoo'

export const zooGroups: ModuleGroup[] = [

  {

    id: 'index-cards',

    title: 'Index Cards',

    description:
      'Learn the signs before testing yourself.',

    image: '/modules/zoo/index-cards.svg',

    color: 'green',

    lessons: [

      zooIndexCards1,

    ],

  },

]