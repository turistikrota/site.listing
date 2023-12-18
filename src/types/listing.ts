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

type ListingFeature = {
  categoryInputUUID: string
  value: string
  isPayed: boolean
  price: number
}

type ListingPrice = {
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

type ListingValidation = {
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

export type ListingListItem = {
  uuid: string
  business: ListingBusiness
  images: ListingImage[]
  meta: I18nTranslation<ListingMeta>
  categoryUUIDs: string[]
  features: ListingFeature[]
  prices: ListingPrice[]
  location: ListingLocation
  validation: ListingValidation
}

export const EmptyListingMeta: ListingMeta = {
  title: '',
  description: '',
  slug: '',
}