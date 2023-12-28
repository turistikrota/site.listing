import { TFunction, useTranslation } from 'next-i18next'
import { FC, PropsWithChildren } from 'react'
import { useDayJS } from '~/hooks/dayjs'
import { useLocalizedFormatter } from '~/hooks/pricing'
import { ListingPrice } from '~/types/listing'
import { ListingFilterDateRange } from '~/types/listing.filter'

type DayJS = ReturnType<typeof useDayJS>

type Section = FC<PropsWithChildren<Props>> & {
  Row: FC<PriceRowProps>
}

type Props = {
  prices: ListingPrice[]
  startDate?: string
  endDate?: string
}

type PriceRange = {
  notAvailable?: boolean
  min?: number
  max?: number
}

type TotalPriceRes = {
  price: number
  days: number
}

type FilteredProps = Props &
  ListingFilterDateRange & {
    t: TFunction
    dayjs: DayJS
  }

const calcMinMaxPrice = (prices: ListingPrice[]): PriceRange => {
  const pricesSorted = prices.sort((a, b) => a.price - b.price)
  if (pricesSorted.length === 0) return { notAvailable: true, min: 0 }
  if (pricesSorted.length === 1) return { min: pricesSorted[0].price, max: pricesSorted[0].price }
  return { min: pricesSorted[0].price, max: pricesSorted[pricesSorted.length - 1].price }
}

const calcTotalPrice = (start: string, end: string, range: ListingPrice[], dayjs: DayJS): TotalPriceRes | undefined => {
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

const calcMinMaxRangeFromStart = (start: string, range: ListingPrice[], dayjs: DayJS): PriceRange => {
  const startDate = dayjs(start)
  const pricesFiltered = range.filter((price) => {
    const priceStartDate = dayjs(price.startDate)
    const priceEndDate = dayjs(price.endDate)
    if (priceStartDate.isAfter(startDate)) return false
    if (priceEndDate.isBefore(startDate)) return false
    return true
  })
  const pricesSorted = pricesFiltered.sort((a, b) => a.price - b.price)
  if (pricesSorted.length === 0) return { notAvailable: true, min: 0 }
  if (pricesSorted.length === 1) return { min: pricesSorted[0].price }
  return { min: pricesSorted[0].price, max: pricesSorted[pricesSorted.length - 1].price }
}

const calcMinMaxRangeFromEnd = (end: string, range: ListingPrice[], dayjs: DayJS): PriceRange => {
  const endDate = dayjs(end)
  const pricesFiltered = range.filter((price) => {
    const priceStartDate = dayjs(price.startDate)
    const priceEndDate = dayjs(price.endDate)
    if (priceStartDate.isAfter(endDate)) return false
    if (priceEndDate.isBefore(endDate)) return false
    return true
  })
  const pricesSorted = pricesFiltered.sort((a, b) => a.price - b.price)
  if (pricesSorted.length === 0) return { notAvailable: true, min: 0 }
  if (pricesSorted.length === 1) return { min: pricesSorted[0].price }
  return { min: pricesSorted[0].price, max: pricesSorted[pricesSorted.length - 1].price }
}

type RangeRendererProps = {
  min?: number
  max?: number
  notAvailable?: boolean
}

type PriceRowProps = {
  label: string
  text: string
  bold?: boolean
}

const DataRow : FC<PriceRowProps> = ({ label, text, bold }) => {
  return  <div className='flex items-center justify-between'>
  <div className='text-sm text-gray-600 dark:text-gray-400'>{label}</div>
  <div className={`text-gray-900 dark:text-gray-100 ${bold ? 'text-xl font-bold' : 'text-lg font-semibold'}`}>
    {text}
  </div>
</div>
}

const RangeRenderer: FC<RangeRendererProps> = ({ min, max, notAvailable }) => {
  const { t, i18n } = useTranslation('listing')
  const localizedFormatter = useLocalizedFormatter()
  if (notAvailable || !min)
    return (
      <div className='w-full text-center text-sm font-bold text-red-600 dark:text-red-400'>
        {t('price.not-available')}
      </div>
    )
  return (
    <div className='flex w-full flex-col gap-1'>
      <DataRow label={t('price.min')} text={localizedFormatter.format(min)} />
      {max && <DataRow label={t('price.max')} text={localizedFormatter.format(max)} />}
      <div className='text-center text-sm text-gray-600 dark:text-gray-400'>{t('price.filterForStrict')}</div>
    </div>
  )
}

const ListingCardPriceBothDates: FC<PropsWithChildren<FilteredProps>> = ({ prices, end, start, dayjs, t, children }) => {
  const total = calcTotalPrice(start!, end!, prices, dayjs)
  const localizedFormatter = useLocalizedFormatter()
  if (!total || total.price === 0)
    return (
      <div className='w-full text-center text-sm font-bold text-red-600 dark:text-red-400'>
        {t('price.not-available-filtered')}
      </div>
    )
  return (
    <div className='flex w-full flex-col gap-1'>
      <DataRow bold label={t('price.total', { count: total.days })} text={localizedFormatter.format(total.price)} />
      {children}
    </div>
  )
}

const ListingCardPriceOnlyStart: FC<FilteredProps> = ({ prices, start, dayjs, t }) => {
  const { min, max, notAvailable } = calcMinMaxRangeFromStart(start!, prices, dayjs)
  return <RangeRenderer min={min} max={max} notAvailable={notAvailable} />
}

const ListingCardPriceOnlyEnd: FC<FilteredProps> = ({ prices, end, dayjs, t }) => {
  const { min, max, notAvailable } = calcMinMaxRangeFromEnd(end!, prices, dayjs)
  return <RangeRenderer min={min} max={max} notAvailable={notAvailable} />
}

const ListingCardPriceFiltered: FC<PropsWithChildren<FilteredProps>> = ({ prices, end, start, dayjs, t, children }) => {
  if (end && start) return <ListingCardPriceBothDates prices={prices} end={end} start={start} dayjs={dayjs} t={t}>{children}</ListingCardPriceBothDates>
  if (end) return <ListingCardPriceOnlyEnd prices={prices} end={end} start={start} dayjs={dayjs} t={t} />
  if (start) return <ListingCardPriceOnlyStart prices={prices} end={end} start={start} dayjs={dayjs} t={t} />
  return (
    <div className='w-full text-center text-sm font-bold text-red-600 dark:text-red-400'>
      {t('price.not-available-filtered')}
    </div>
  )
}

const ListingCardPriceRange: FC<Props> = ({ prices }) => {
  const { min, max, notAvailable } = calcMinMaxPrice(prices)
  return <RangeRenderer min={min!} max={max!} notAvailable={notAvailable!} />
}

const ListingCardPriceSection: Section = ({ prices, startDate, endDate, children }) => {
  const { t, i18n } = useTranslation('listing')
  const dayjs = useDayJS(i18n.language)
  return (
    <div className='col-span-12 flex items-center justify-start gap-2'>
      {(!!startDate || !!endDate) ? (
        <ListingCardPriceFiltered
          t={t}
          dayjs={dayjs}
          prices={prices}
          start={startDate}
          end={endDate}
        >
          {children}
        </ListingCardPriceFiltered>
      ) : (
        <ListingCardPriceRange prices={prices} />
      )}
    </div>
  )
}

ListingCardPriceSection.Row = DataRow

export default ListingCardPriceSection
