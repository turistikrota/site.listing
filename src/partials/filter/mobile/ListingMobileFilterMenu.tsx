import { findCityByCoordinates } from '@turistikrota/location-tr'
import { Locales, isCoordinates } from '@turistikrota/ui/types'
import { useTranslation } from 'next-i18next'
import { SelectionItem } from '~/components/selection/RichSelection'
import { useListingFilter } from '~/contexts/listing.filter'
import { useCategorySelection } from '~/hooks/category'
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
    queryKey: 'start_date',
  },
  {
    component: 'date',
    queryKey: 'end_date',
  },
  {
    component: 'price',
    queryKey: 'price',
  },
  {
    component: 'validation',
    queryKey: 'validation',
  }
]

type ParserOptions = {
  locale: Locales
  t: ReturnType<typeof useTranslation>['t']
  selectedCategories:SelectionItem[]
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
    console.log('value::', value, 'options::', options)
    if (!value || !Array.isArray(value)) return ''
    return options.selectedCategories.reduce((acc, category) => {
      if (value.includes(category.id)) {
        if (acc.length > 0) {
          acc += ', '
        }
        acc += category.name
      }
      return acc
    }, '')
  },
  price: (value, options) => {
    if(!value) return ''
    if(!value.min && !!value.max) return options.t('filter:components.price.max-price', {max: value.max})
    if(!!value.min && !value.max) return options.t('filter:components.price.min-price', {min: value.min})
    return options.t('filter:components.price.range', {min: value.min, max: value.max})
  },
  date: (value, options) => {
    if (!value) return ''
    return value
  },
  people: (value, options) => {
    if (!value || !value.adult || !value.baby || !value.kid) return ''
    let text = ''
    if (value.adult > 0) {
      text += options.t('components.people.adult', { count: value.adult })
    }
    if (value.kid > 0) {
      if (text.length > 0) {
        text += ', '
      }
      text += options.t('components.people.kid', { count: value.kid })
    }
    if (value.baby > 0) {
      if (text.length > 0) {
        text += ', '
      }
      text += options.t('components.people.baby', { count: value.baby })
    }
    return text
  },
  validation: (value, options) => {
    return JSON.stringify(value)
  }
}

const ListingMobileFilterFilterMenu: React.FC<Props> = ({ onOpen }) => {
    const {selectedCategories} = useCategorySelection()
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
            selectedCategories
          })}
        ></ListingMobileFilterGroup>
      ))}
    </>
  )
}

export default ListingMobileFilterFilterMenu