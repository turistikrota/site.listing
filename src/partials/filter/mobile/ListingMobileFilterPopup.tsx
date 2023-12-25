import Button from '@turistikrota/ui/button'
import Condition from '@turistikrota/ui/condition'
import Popup from '@turistikrota/ui/popup'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Spinner } from 'sspin'
import { useListingFilter } from '~/contexts/listing.filter'
import { ListingFilter } from '~/types/listing.filter'
import { ContentProps } from '../ListingFilter.types'
import { FilterComponents } from './ListingMobileFilter.types'
import ListingMobileFilterFilterMenu from './ListingMobileFilterMenu'
import ListingMobileFilterPopupHead from './ListingMobileFilterPopupHead'

type CloseableProps = {
  onClose: () => void
}

type Props = ContentProps & CloseableProps & {
    open: boolean
  }

const Spin = () => (
  <div className='w-full min-h-[5vh] flex items-center justify-center'>
    <Spinner />
  </div>
)

const Components: Record<FilterComponents, React.ComponentType<any>> = {
  'city-select': dynamic(() => import('../shared/ListingFilterCityGroup'), {
    loading: Spin,
  }),
  distance: dynamic(() => import('../shared/ListingFilterDistanceGroup'), {
    loading: Spin,
  }),
  query: dynamic(() => import('../shared/ListingFilterQueryGroup'), {
    loading: Spin,
  }),
  category: dynamic(() => import('../shared/ListingFilterCategoryGroup'), {
    loading: Spin,
  }),
  date: dynamic(() => import('../shared/ListingFilterDateGroup'), {
    loading: Spin,
  }),
  people: dynamic(() => import('../shared/ListingFilterPeopleGroup'), {
    loading: Spin,
  }),
    price: dynamic(() => import('../shared/ListingFilterPriceGroup'), {
        loading: Spin,
    }),
    validation: dynamic(() => import('../shared/ListingFilterValidationGroup'), {
        loading: Spin,
    }),
}

const ListingMobileFilterPopup: React.FC<Props> = ({ onClose, open, data, loading }) => {
  const [title, setTitle] = useState<string | null>(null)
  const [key, setKey] = useState<keyof ListingFilter | null>(null)
  const { isFiltered, clean } = useListingFilter()
  const [filterComponent, setFilterComponent] = useState<FilterComponents | null>(null)
  const { t } = useTranslation('filter')

  const onOpenFilter = (component: FilterComponents, key: keyof ListingFilter) => {
    setFilterComponent(component)
    setKey(key)
    setTitle(t(`components.${component}.title`))
  }

  const onCloseFilter = () => {
    setFilterComponent(null)
    setTitle(null)
    setKey(null)
  }

  const onClearFilter = () => {
    clean()
    onClose()
  }

  const ActiveComponent = filterComponent && Components[filterComponent]

  return (
    <Popup
      onClose={onClose}
      open={open}
      size='2xl'
      head={
        <ListingMobileFilterPopupHead
          title={title ?? t('title').toString()}
          resultCount={!title ? data?.filteredTotal ?? 0 : 0}
          onClose={onCloseFilter}
          closeable={!!title}
          filterKey={key}
          onClearAll={onClearFilter}
          clearable={isFiltered}
        />
      }
    >
      <>
        {ActiveComponent && (
          <>
            <ActiveComponent onClose={onCloseFilter} />
            <Button className='mt-12' variant='secondary' onClick={onCloseFilter} disabled={loading}>
              {t('apply')}
            </Button>
          </>
        )}
        {!ActiveComponent && (
          <>
            <ListingMobileFilterFilterMenu onOpen={onOpenFilter}></ListingMobileFilterFilterMenu>
            <Condition value={isFiltered}>
              <Button className='mt-12' variant='primary' onClick={onCloseFilter} disabled={loading}>
                {t('see-results', {
                  count: data?.filteredTotal ?? 0,
                })}
              </Button>
            </Condition>
          </>
        )}
      </>
    </Popup>
  )
}

export default ListingMobileFilterPopup