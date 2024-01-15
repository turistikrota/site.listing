import { Coordinates, I18nTranslation } from '@turistikrota/ui/types'

type ListingBusiness = {
  uuid: string
  nickName: string
}

export type ListingImage = {
  url: string
  order: number
}

export type ListingMeta = {
  title: string
  description: string
  slug: string
}

export type ListingFeature = {
  categoryInputUUID: string
  value: string
  isPayed: boolean
  price: number
}

export type ListingPrice = {
  startDate: string
  endDate: string
  price: number
}

type ListingLocation = {
  country: string
  city: string
  street: string
  address: string
  isStrict: boolean
  coordinates: Coordinates
}

export type ListingValidation = {
  minAdult: number
  maxAdult: number
  minKid: number
  maxKid: number
  minBaby: number
  maxBaby: number
  minDate: number
  maxDate: number
  onlyFamily: boolean
  noPet: boolean
  noSmoke: boolean
  noAlcohol: boolean
  noParty: boolean
  noUnmarried: boolean
  noGuest: boolean
}
export type ValidationKey = keyof ListingValidation
export type ValidationValue<Key extends ValidationKey> = ListingValidation[Key]

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  TRY = 'TRY',
}

export type ListingListItem = {
  uuid: string
  business: ListingBusiness
  images: ListingImage[]
  meta: I18nTranslation<ListingMeta>
  prices: ListingPrice[]
  location: ListingLocation
  currency: Currency
}

export const EmptyListingMeta: ListingMeta = {
  title: '',
  description: '',
  slug: '',
}

export type ListingDetail = {
  uuid: string
  business: ListingBusiness
  images: ListingImage[]
  meta: I18nTranslation<ListingMeta>
  categoryUUIDs: string[]
  features: ListingFeature[]
  prices: ListingPrice[]
  location: ListingLocation
  validation: ListingValidation
  currency: Currency
  createdAt: string
  updatedAt: string
}
