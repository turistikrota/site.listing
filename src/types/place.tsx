import { Type } from "~/api/place.api"


export type PlaceTypeItems = {
  icon: string
  text: string
  color: string
  variant?: string
}

export const PlaceTypes: Record<Type, PlaceTypeItems> = {
  [Type.Eating]: {
    icon: 'bx bx-food-menu',
    text: 'types.eating',
    color: 'bg-secondary-100 text-secondary-900 dark:bg-secondary-900 dark:text-secondary-100',
    variant: 'secondary',
  },
  [Type.Coffee]: {
    icon: 'bx bx-coffee',
    text: 'types.coffee',
    color: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
    variant: 'yellow',
  },
  [Type.Bar]: {
    icon: 'bx bx-drink',
    text: 'types.bar',
    color: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
    variant: 'blue',
  },
  [Type.Beach]: {
    icon: 'bx bx-swim',
    text: 'types.beach',
    color: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
    variant: 'green',
  },
  [Type.Amaze]: {
    icon: 'bx bx-cycling',
    text: 'types.amaze',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
    variant: 'purple',
  },
  [Type.Shopping]: {
    icon: 'bx bx-shopping-bag',
    text: 'types.shopping',
    color: 'bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100',
    variant: 'orange',
  },
  [Type.Transport]: {
    icon: 'bx bx-bus',
    text: 'types.transport',
    color: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100',
    variant: 'indigo',
  },
  [Type.Culture]: {
    icon: 'bx bxs-landmark',
    text: 'types.culture',
    color: 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100',
  },
  [Type.Nature]: {
    icon: 'bx bxs-tree',
    text: 'types.nature',
    color: 'bg-teal-100 text-teal-900 dark:bg-teal-900 dark:text-teal-100',
    variant: 'teal',
  },
  [Type.Health]: {
    icon: 'bx bx-heart',
    text: 'types.health',
    color: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
    variant: 'blue',
  },
  [Type.Sport]: {
    icon: 'bx bx-football',
    text: 'types.sport',
    color: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
    variant: 'green',
  },
  [Type.Nightlife]: {
    icon: 'bx bx-moon',
    text: 'types.nightlife',
    color: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100',
    variant: 'indigo',
  },
  [Type.Garden]: {
    icon: 'bx bxs-florist',
    text: 'types.garden',
    color: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
    variant: 'green',
  },
  [Type.Temple]: {
    icon: 'bx bx-hard-hat',
    text: 'types.temple',
    color: 'bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100',
    variant: 'orange',
  },
  [Type.Museum]: {
    icon: 'bx bx-arch',
    text: 'types.museum',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
    variant: 'purple',
  },
  [Type.Antique]: {
    icon: 'bx bxs-castle',
    text: 'types.antique',
    color: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
    variant: 'yellow',
  },
  [Type.ThemePark]: {
    icon: 'bx bx-carousel',
    text: 'types.themePark',
    color: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100',
    variant: 'indigo',
  },
  [Type.Other]: {
    icon: 'bx bx-plus',
    text: 'types.other',
    color: 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100',
  },
}