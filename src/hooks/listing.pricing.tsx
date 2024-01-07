import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { ListingPrice } from '~/types/listing'
import { useDayJS } from './dayjs'

type DayJS = ReturnType<typeof useDayJS>

export type TotalPriceRes = {
  price: number
  days: number
}

export const useListingPricingTotalPrice = (range: ListingPrice[], start?: string, end?: string): [number, number] => {
  const { i18n } = useTranslation()
  const dayjs = useDayJS(i18n.language)
  const [total, setTotal] = useState<TotalPriceRes | undefined>(undefined)

  useEffect(() => {
    if (!start || !end) return
    setTotal(calcTotalPrice(start, end, range, dayjs))
  }, [start, end, range])

  return total ? [total.price, total.days] : [0, 0]
}

export const calcTotalPrice = (
  start: string,
  end: string,
  range: ListingPrice[],
  dayjs: DayJS,
): TotalPriceRes | undefined => {
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  const days = endDate.diff(startDate, 'day')
  if (days < 0) return undefined
  const totalPrice = range.reduce((total, price) => {
    const priceStartDate = dayjs(price.startDate)
    const priceEndDate = dayjs(price.endDate)
    if (priceStartDate.isAfter(endDate)) return total
    if (priceEndDate.isBefore(startDate)) return total
    const priceDays = priceEndDate.diff(priceStartDate, 'day')
    const daysToPay = Math.min(days, priceDays)
    return total + daysToPay * price.price
  }, 0)
  return { price: totalPrice, days }
}
