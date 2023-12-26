import { Coordinates } from '@turistikrota/ui/types'

export enum ListingOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ListingSort {
  MostRecent = 'most_recent',
  Nearest = 'nearest',
  Price = 'price',
}

type ListingFilterPrice = {
  min?: number
  max?: number
}

type ListingFilterValidation = {
  family?: boolean
  pet?: boolean
  smoke?: boolean
  alcohol?: boolean
  party?: boolean
  unmarried?: boolean
  guest?: boolean
}

type ListingFilterFeature = {
  categoryInputUUID: string
  value: string
}

type ListingFilterDateRange = {
  start?: string
  end?: string
}

type ListingFilterPeople = {
  adult?: number
  kid?: number
  baby?: number
}

export type ListingFilter = {
  query?: string
  price?: ListingFilterPrice
  validation?: ListingFilterValidation
  coordinates?: Coordinates
  categories?: string[]
  features?: ListingFilterFeature[]
  distance?: number
  people?: ListingFilterPeople
  date?: ListingFilterDateRange
  sort?: ListingSort
  order?: ListingOrder
  v?: ContentType 
}

export type ListingFilterKeys = keyof ListingFilter

export type ContentType = 'list' | 'map'

export type ListingKeyBindings = {
  q?: string
  page?: string
  limit?: string
  lat?: string
  lng?: string
  features?: string
  categories?: string
  dist?: string
  sdate?: string
  edate?: string
  sort?: string
  order?: string
  adult?: string
  kid?: string
  baby?: string
  family?: string
  pet?: string
  smoke?: string
  alcohol?: string
  party?: string
  unmarried?: string
  guest?: string
  minp?: string
  maxp?: string
}

export type ListingKeys = keyof ListingKeyBindings

export type Distance = 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export function isDistance(distance: any): distance is Distance {
  return typeof distance === 'number' && distance >= 7 && distance <= 15
}

export function isSort(sort: string): sort is ListingSort {
  return Object.values(ListingSort).includes(sort as ListingSort)
}

export function isOrder(order: string): order is ListingOrder {
  return Object.values(ListingOrder).includes(order as ListingOrder)
}