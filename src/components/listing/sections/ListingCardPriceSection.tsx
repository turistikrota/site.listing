import { TFunction, useTranslation } from "next-i18next"
import { FC } from "react"
import { useListingFilter } from "~/contexts/listing.filter"
import { useDayJS } from "~/hooks/dayjs"
import { useLocalizedFormatter } from "~/hooks/pricing"
import { ListingPrice } from "~/types/listing"
import { ListingFilterDateRange } from "~/types/listing.filter"

type DayJS = ReturnType<typeof useDayJS>


type Props = {
    prices: ListingPrice[]
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

type FilteredProps = Props & ListingFilterDateRange & {
    t: TFunction
    dayjs: DayJS
}

const calcMinMaxPrice = (prices: ListingPrice[]) : PriceRange => {
    const pricesSorted = prices.sort((a, b) => a.price - b.price)
    if (pricesSorted.length === 0) return { notAvailable: true, min: 0}
    if (pricesSorted.length === 1) return {min: pricesSorted[0].price, max:pricesSorted[0].price}
    return {min: pricesSorted[0].price, max: pricesSorted[pricesSorted.length - 1].price}
}

const calcTotalPrice = (start: string, end: string, range: ListingPrice[], dayjs: DayJS) : TotalPriceRes | undefined => {
    const startDate = dayjs(start)
    const endDate = dayjs(end)
    const days = endDate.diff(startDate, 'day')
    if(days < 0) return undefined
    const totalPrice = range.reduce((total, price) => {
        const priceStartDate = dayjs(price.startDate)
        const priceEndDate = dayjs(price.endDate)
        if(priceStartDate.isAfter(endDate)) return total
        if(priceEndDate.isBefore(startDate)) return total
        const priceDays = priceEndDate.diff(priceStartDate, 'day')
        const daysToPay = Math.min(days, priceDays)
        return total + (daysToPay * price.price)
    }, 0)
    return {price: totalPrice, days}
}

const calcMinMaxRangeFromStart = (start: string, range: ListingPrice[], dayjs: DayJS) : PriceRange => {
    const startDate = dayjs(start)
    const pricesFiltered = range.filter(price => {
        const priceStartDate = dayjs(price.startDate)
        const priceEndDate = dayjs(price.endDate)
        if(priceStartDate.isAfter(startDate)) return false
        if(priceEndDate.isBefore(startDate)) return false
        return true
    })
    const pricesSorted = pricesFiltered.sort((a, b) => a.price - b.price)
    if (pricesSorted.length === 0) return { notAvailable: true, min: 0}
    if (pricesSorted.length === 1) return {min: pricesSorted[0].price}
    return {min: pricesSorted[0].price, max: pricesSorted[pricesSorted.length - 1].price}
}

const calcMinMaxRangeFromEnd = (end: string, range: ListingPrice[], dayjs: DayJS) : PriceRange => {
    const endDate = dayjs(end)
    const pricesFiltered = range.filter(price => {
        const priceStartDate = dayjs(price.startDate)
        const priceEndDate = dayjs(price.endDate)
        if(priceStartDate.isAfter(endDate)) return false
        if(priceEndDate.isBefore(endDate)) return false
        return true
    })
    const pricesSorted = pricesFiltered.sort((a, b) => a.price - b.price)
    if (pricesSorted.length === 0) return { notAvailable: true, min: 0}
    if (pricesSorted.length === 1) return {min: pricesSorted[0].price}
    return {min: pricesSorted[0].price, max: pricesSorted[pricesSorted.length - 1].price}
}

type RangeRendererProps = {
    min?: number
    max?: number
    notAvailable?: boolean
}

const RangeRenderer : FC<RangeRendererProps> = ({min, max, notAvailable}) => {
    const { t, i18n } = useTranslation('listing')
    const localizedFormatter = useLocalizedFormatter()
    if(notAvailable || !min) return <div className="text-sm font-bold text-center w-full dark:text-red-400 text-red-600">{t('price.not-available')}</div>
    return <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-center">
            <div className="text-sm dark:text-gray-400 text-gray-600">{t('price.min')}</div>
            <div className="text-lg font-semibold dark:text-gray-100 text-gray-900">{localizedFormatter.format(min)}</div>
        </div>
        {max && <div className="flex justify-between items-center">
            <div className="text-sm dark:text-gray-400 text-gray-600">{t('price.max')}</div>
            <div className="text-lg font-semibold dark:text-gray-100 text-gray-900">{localizedFormatter.format(max)}</div>
        </div>}
        <div className="text-sm text-center dark:text-gray-400 text-gray-600">{t('price.filterForStrict')}</div>
    </div>
}

const ListingCardPriceBothDates : FC<FilteredProps> = ({prices, end, start, dayjs, t}) => {
    const total = calcTotalPrice(start!, end!, prices, dayjs)
    const localizedFormatter = useLocalizedFormatter()
    if(!total || total.price === 0) return <div className="text-sm font-bold text-center w-full dark:text-red-400 text-red-600">{t('price.not-available-filtered')}</div>
    return <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
            <div className="text-sm dark:text-gray-400 text-gray-600">{t('price.total', {count: total.days})}</div>
            <div className="text-xl font-bold dark:text-gray-100 text-gray-900">{localizedFormatter.format(total.price)}</div>
        </div>
    </div>
}

const ListingCardPriceOnlyStart : FC<FilteredProps> = ({prices, start, dayjs, t}) => {
    const { min, max, notAvailable } = calcMinMaxRangeFromStart(start!, prices, dayjs)
    return <RangeRenderer min={min} max={max} notAvailable={notAvailable} />
}

const ListingCardPriceOnlyEnd : FC<FilteredProps> = ({prices, end, dayjs, t}) => {
    const { min, max, notAvailable } = calcMinMaxRangeFromEnd(end!, prices, dayjs)
    return <RangeRenderer min={min} max={max} notAvailable={notAvailable} />
}

const ListingCardPriceFiltered : FC<FilteredProps> = ({prices, end, start, dayjs, t}) => {
    if(end && start) return <ListingCardPriceBothDates prices={prices} end={end} start={start} dayjs={dayjs} t={t} />
    if (end) return <ListingCardPriceOnlyEnd prices={prices} end={end} start={start} dayjs={dayjs} t={t} />
    if (start) return <ListingCardPriceOnlyStart prices={prices} end={end} start={start} dayjs={dayjs} t={t} />
    return <div className="text-sm font-bold text-center w-full dark:text-red-400 text-red-600">{t('price.not-available-filtered')}</div>
}

const ListingCardPriceRange : FC<Props> = ({prices}) => {
    const { min, max, notAvailable } = calcMinMaxPrice(prices)
    return <RangeRenderer min={min!} max={max!} notAvailable={notAvailable!} />
}

const ListingCardPriceSection: FC<Props> = ({prices}) => {
    const { t, i18n } = useTranslation('listing')
    const { query } = useListingFilter()
    const dayjs = useDayJS(i18n.language)
    return <div className="col-span-12 flex items-center justify-start gap-2">
        {query.filter.date ? <ListingCardPriceFiltered t={t} dayjs={dayjs} prices={prices} start={query.filter.date.start} end={query.filter.date.end} /> : <ListingCardPriceRange prices={prices} />}
    </div>
}

export default ListingCardPriceSection