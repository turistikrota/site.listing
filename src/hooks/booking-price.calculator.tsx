import { useMemo } from 'react'
import { usePayConfig } from '~/contexts/pay.config'
import { ListingPrice } from '~/types/listing'
import { useListingPricingTotalPrice } from './listing.pricing'

type Result = {
  price: number
  cimissionRate: number
  comission: number
  total: number
}

export const useBookingPriceCalc = (range: ListingPrice[], start?: string, end?: string): Result => {
  const price = useListingPricingTotalPrice(range, start, end)
  const { comissionRate } = usePayConfig()
  const comission = useMemo(() => price * comissionRate, [price, comissionRate])
  const total = useMemo(() => price + comission, [price, comission])
  return { price: price, cimissionRate: comissionRate, comission: comission, total }
}
