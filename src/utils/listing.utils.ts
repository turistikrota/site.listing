import { PaginationRequest } from '~/types/pagination'
import { ListingImage } from '../types/listing'
import { ListingFilter, ListingKeyBindings, ListingKeys, isDistance, isOrder, isSort } from '../types/listing.filter'

type Parser = (value: string) => void

const checkBoolValue = (value: string): boolean | undefined => {
  switch (value) {
    case 'on':
      return true
    case 'off':
      return false
    default:
      return undefined
  }
}

const toBool = (value: boolean): string => {
  return value ? 'on' : 'off'
}

export const getQueryFromSearchParams = (searchParams: URLSearchParams): PaginationRequest<ListingFilter> => {
  const bindings: ListingKeyBindings = {}
  searchParams.forEach((value, key) => {
    bindings[key as ListingKeys] = value
  })
  return getQueryFromKeyBindings(bindings)
}

export const getQueryFromKeyBindings = (bindings: ListingKeyBindings) => {
  const query: PaginationRequest<ListingFilter> = { filter: {} }
  const Bindings: Record<ListingKeys, Parser> = {
    page: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.page = val
      }
    },
    limit: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.limit = val
      }
    },
    lat: (value: string) => {
      const { lng } = bindings
      if (lng) {
        const lat = parseFloat(value)
        const lng2 = parseFloat(lng)
        if (!isNaN(lat) && !isNaN(lng2)) {
          query.filter.coordinates = [lat, lng2]
        }
      }
    },
    lng: (value: string) => {
      const { lat } = bindings
      if (lat) {
        const lng = parseFloat(value)
        const lat2 = parseFloat(lat)
        if (!isNaN(lng) && !isNaN(lat2)) {
          query.filter.coordinates = [lat2, lng]
        }
      }
    },
    features: (value: string) => {
      const tuples = value.split('-')
      if (tuples.length > 0) {
        const features: ListingFilter['features'] = []
        query.filter.features = tuples.reduce((acc, tuple) => {
          const [categoryInputUUID, value] = tuple.split(':')
          if (categoryInputUUID && value) {
            acc.push({ categoryInputUUID, value })
          }
          return acc
        }, features)
      }
    },
    categories: (value: string) => {
      const categories = value.split('-')
      if (categories.length > 0) {
        query.filter.categories = categories
      }
    },
    dist: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val) && isDistance(val)) {
        query.filter.distance = val
      }
    },
    sdate: (value: string) => {
      if (!isNaN(Date.parse(value))) {
        query.filter.start_date = new Date(value).toISOString().split('T')[0]
      }
    },
    edate: (value: string) => {
      if (!isNaN(Date.parse(value))) {
        query.filter.end_date = new Date(value).toISOString().split('T')[0]
      }
    },

    q: (value: string) => {
      query.filter.query = value
    },
    sort: (value: string) => {
      if (isSort(value)) {
        query.filter.sort = value
        return
      }
      query.filter.sort = undefined
    },
    order: (value: string) => {
      if (isOrder(value)) {
        query.filter.order = value
        return
      }
      query.filter.order = undefined
    },
    minp: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.price = { ...query.filter.price, min: val }
      }
    },
    maxp: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.price = { ...query.filter.price, max: val }
      }
    },
    adult: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.validation = { ...query.filter.validation, adult: val }
      }
    },
    kid: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.validation = { ...query.filter.validation, kid: val }
      }
    },
    baby: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.validation = { ...query.filter.validation, baby: val }
      }
    },
    family: (value: string) => {
      const val = checkBoolValue(value)
      query.filter.validation = { ...query.filter.validation, family: val }
    },
    pet: (value: string) => {
      const val = checkBoolValue(value)
      query.filter.validation = { ...query.filter.validation, pet: val }
    },
    smoke: (value: string) => {
      const val = checkBoolValue(value)
      query.filter.validation = { ...query.filter.validation, smoke: val }
    },
    alcohol: (value: string) => {
      const val = checkBoolValue(value)
      query.filter.validation = { ...query.filter.validation, alcohol: val }
    },
    party: (value: string) => {
      const val = checkBoolValue(value)
      query.filter.validation = { ...query.filter.validation, party: val }
    },
    unmarried: (value: string) => {
      const val = checkBoolValue(value)
      query.filter.validation = { ...query.filter.validation, unmarried: val }
    },
    guest: (value: string) => {
      const val = checkBoolValue(value)
      query.filter.validation = { ...query.filter.validation, guest: val }
    },
  }
  Object.entries(bindings).forEach(([key, value]) => {
    const parser = Bindings[key as ListingKeys]
    if (parser) {
      parser(value)
    }
  })
  return query
}

export const toQueryString = (query: PaginationRequest<ListingFilter>): string => {
  const q = new URLSearchParams()
  if (query.page) {
    q.set('page', query.page.toString())
  }
  if (query.limit) {
    q.set('limit', query.limit.toString())
  }
  if (query.filter.query) {
    q.set('q', query.filter.query)
  }
  if (query.filter.coordinates) {
    const [lat, lng] = query.filter.coordinates
    q.set('lat', lat.toString())
    q.set('lng', lng.toString())
  }
  if (query.filter.categories) {
    q.set('categories', query.filter.categories.join('-'))
  }
  if (query.filter.features) {
    const features = query.filter.features.map((feature) => `${feature.categoryInputUUID}:${feature.value}`)
    q.set('features', features.join('-'))
  }
  if (query.filter.distance) {
    q.set('dist', query.filter.distance.toString())
  }
  if (query.filter.start_date) {
    q.set('sdate', query.filter.start_date)
  }
  if (query.filter.end_date) {
    q.set('edate', query.filter.end_date)
  }
  if (query.filter.sort) {
    q.set('sort', query.filter.sort)
  }
  if (query.filter.order) {
    q.set('order', query.filter.order)
  }
  if (query.filter.price) {
    if (query.filter.price.min) {
      q.set('minp', query.filter.price.min.toString())
    }
    if (query.filter.price.max) {
      q.set('maxp', query.filter.price.max.toString())
    }
  }
  if (query.filter.validation) {
    if (query.filter.validation.adult) {
      q.set('adult', query.filter.validation.adult.toString())
    }
    if (query.filter.validation.kid) {
      q.set('kid', query.filter.validation.kid.toString())
    }
    if (query.filter.validation.baby) {
      q.set('baby', query.filter.validation.baby.toString())
    }
    if (typeof query.filter.validation.family !== 'undefined') {
      q.set('family', toBool(query.filter.validation.family))
    }
    if (typeof query.filter.validation.pet !== 'undefined') {
      q.set('pet', toBool(query.filter.validation.pet))
    }
    if (typeof query.filter.validation.smoke !== 'undefined') {
      q.set('smoke', toBool(query.filter.validation.smoke))
    }
    if (typeof query.filter.validation.alcohol !== 'undefined') {
      q.set('alcohol', toBool(query.filter.validation.alcohol))
    }
    if (typeof query.filter.validation.party !== 'undefined') {
      q.set('party', toBool(query.filter.validation.party))
    }
    if (typeof query.filter.validation.unmarried !== 'undefined') {
      q.set('unmarried', toBool(query.filter.validation.unmarried))
    }
    if (typeof query.filter.validation.guest !== 'undefined') {
      q.set('guest', toBool(query.filter.validation.guest))
    }
  }
  return q.toString()
}

export const mapAndSortImages = (images: ListingImage[]): string[] => {
  return images.sort((a, b) => a.order - b.order).map((image) => image.url)
}