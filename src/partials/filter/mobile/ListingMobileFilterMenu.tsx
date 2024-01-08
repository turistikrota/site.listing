import { findCityByCoordinates } from '@turistikrota/location-tr'
import { Locales, isCoordinates } from '@turistikrota/ui/types'
import { useTranslation } from 'next-i18next'
import { SelectionItem } from '~/components/selection/RichSelection'
import { useListingFilter } from '~/contexts/listing.filter'
import { useCategorySelection } from '~/hooks/category'
import { useDayJS } from '~/hooks/dayjs'
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
  },
  {
    component: 'category',
    queryKey: 'categories',
  },
  {
    component: 'date',
    queryKey: 'date',
  },
  {
    component: 'people',
    queryKey: 'people',
  },
  {
    component: 'price',
    queryKey: 'price',
  },
  {
    component: 'validation',
    queryKey: 'validation',
  },
]

type ParserOptions = {
  locale: Locales
  t: ReturnType<typeof useTranslation>['t']
  selectedCategories: SelectionItem[]
  dayjs: ReturnType<typeof useDayJS>
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
  category: (value, options) => {
    if (!value || !Array.isArray(value)) return ''
    return options.selectedCategories
      .reduce((acc, category) => {
        if (value.includes(category.id)) {
          acc.push(category.name)
        }
        return acc
      }, [] as string[])
      .join(', ')
  },
  price: (value, options) => {
    if (!value) return ''
    if (!value.min && !!value.max) return options.t('filter:components.price.max-price', { max: value.max })
    if (!!value.min && !value.max) return options.t('filter:components.price.min-price', { min: value.min })
    return options.t('filter:components.price.range', { min: value.min, max: value.max })
  },
  date: (value, options) => {
    if (!value) return ''
    if (value.start && value.end)
      return options.t('components.date.range', {
        start: options.dayjs(value.start).format('DD MMMM YYYY'),
        end: options.dayjs(value.end).format('DD MMMM YYYY'),
      })
    if (value.start)
      return options.t('components.start-date.dynamic', { start: options.dayjs(value.start).format('DD MMMM YYYY') })
    if (value.end)
      return options.t('components.end-date.dynamic', { start: options.dayjs(value.end).format('DD MMMM YYYY') })
    return ''
  },
  people: (value, options) => {
    if (!value || (!value.adult && !value.baby && !value.kid)) return ''
    const text: string[] = []
    if (value.adult > 0) {
      text.push(options.t('components.people.dynamic.adult', { count: value.adult }))
    }
    if (value.kid > 0) {
      text.push(options.t('components.people.dynamic.kid', { count: value.kid }))
    }
    if (value.baby > 0) {
      text.push(options.t('components.people.dynamic.baby', { count: value.baby }))
    }
    return text.join(', ')
  },
  validation: (value, options) => {
    if (!value) return ''
    const text: string[] = []
    Object.entries(value).forEach(([key, value]) => {
      if (value !== 'on' && !value) return
      text.push(options.t(`components.validation.${key}.label`))
    })
    return text.join(', ')
  },
}

const ListingMobileFilterFilterMenu: React.FC<Props> = ({ onOpen }) => {
  const { selectedCategories } = useCategorySelection()
  const { t, i18n } = useTranslation(['filter', 'common'])
  const dayjs = useDayJS(i18n.language)
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
            selectedCategories,
            dayjs,
          })}
          horizontal
        ></ListingMobileFilterGroup>
      ))}
    </>
  )
}

export default ListingMobileFilterFilterMenu
