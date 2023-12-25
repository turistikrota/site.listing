import { findCityByCoordinates } from '@turistikrota/location-tr'
import { Locales, isCoordinates } from '@turistikrota/ui/types'
import { useTranslation } from 'next-i18next'
import { useListingFilter } from '~/contexts/listing.filter'
import { ListingFilter } from '~/types/listing.filter'
import { FilterComponents } from './ListingMobileFilter.types'
import ListingMobileFilterGroup from './ListingMobileFilterGroup'


type Props = {
  onOpen: (component: FilterComponents, key: keyof ListingFilter) => void
}

type Item = {
  component: FilterComponents
  queryKey: keyof ListingFilter
}

const items: Item[] = [
  {
    component: 'city-select',
    queryKey: 'coordinates',
  },
  {
    component: 'distance',
    queryKey: 'distance',
  },
  {
    component: 'query',
    queryKey: 'query',
  }
]

type ParserOptions = {
  locale: Locales
  t: ReturnType<typeof useTranslation>['t']
}

const componentValueParsers: Record<FilterComponents, (value: any, options: ParserOptions) => any> = {
  'city-select': (value) => {
    if (isCoordinates(value)) {
      const city = findCityByCoordinates(value)
      if (city) return city.name
    }
    return ''
  },
  distance: (value) => {
    if (!value) return ''
    return value + ' km'
  },
  query: (value) => {
    if (!value) return ''
    return value
  },
}

const ListingMobileFilterFilterMenu: React.FC<Props> = ({ onOpen }) => {
  const { t, i18n } = useTranslation(['filter', 'common'])
  const { query } = useListingFilter()

  return (
    <>
      {items.map((item) => (
        <ListingMobileFilterGroup
          key={item.component}
          title={t(`filter:components.${item.component}.text`)}
          onClick={() => onOpen(item.component, item.queryKey)}
          values={componentValueParsers[item.component](query.filter[item.queryKey], {
            locale: i18n.language as Locales,
            t,
          })}
        ></ListingMobileFilterGroup>
      ))}
    </>
  )
}

export default ListingMobileFilterFilterMenu