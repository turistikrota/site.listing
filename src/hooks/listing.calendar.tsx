import { CalendarData } from '@turistikrota/ui'
import { useMemo } from 'react'
import { ListingPrice } from '~/types/listing'

export const useListingCalendar = (prices: ListingPrice[]): CalendarData<number> => {
  return useMemo<CalendarData<number>>(() => {
    const data: CalendarData<number> = {}
    prices.forEach((price) => {
      const startDate = new Date(price.startDate)
      const endDate = new Date(price.endDate)
      while (startDate <= endDate) {
        const date = `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`
        if (!data[date]) data[date] = []
        data[date].push(price.price)
        startDate.setDate(startDate.getDate() + 1)
      }
    })
    return data
  }, [prices])
}