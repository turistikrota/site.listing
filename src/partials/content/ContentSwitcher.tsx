import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import { Coordinates, ListResponse, Variant } from '@turistikrota/ui/types'
import debounce from '@turistikrota/ui/utils/debounce'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { FC, useEffect, useMemo, useState } from 'react'
import { CategoryDetail } from '~/api/category.api'
import { PaymentConfig } from '~/api/pay.api'
import { useListingFilter } from '~/contexts/listing.filter'
import { PayConfigProvider } from '~/contexts/pay.config'
import { useListingPusher } from '~/hooks/listing-pusher'
import { useListings } from '~/hooks/listings'
import CategoryDetailLayout from '~/layouts/CategoryDetailLayout'
import { isValidationError } from '~/types/error'
import { ListingListItem } from '~/types/listing'
import { ContentType } from '~/types/listing.filter'
import { deepMerge } from '~/utils/deepMerge'
import ListingListSeo from '../seo/ListingListSeo'

type Props = {
  response?: ListResponse<ListingListItem>
  payConfig?: PaymentConfig
  categoryDetail?: CategoryDetail
  error: any
}

export type ContentProps = {
  loading: boolean
  data: ListResponse<ListingListItem> | null
}

const DynamicList = dynamic(() => import('./list/ListingListContent'))
const DynamicMap = dynamic(() => import('./map/ListingMapContent'), { ssr: false })

type ButtonProps = {
  text: string
  icon: string
  onClick: () => void
  variant: Variant
}

const FixedButton: React.FC<ButtonProps> = ({ text, variant, icon, onClick }) => {
  return (
    <div className='fixed bottom-6 right-1/2 z-500 min-w-max translate-x-1/2 transform'>
      <Button
        onClick={() => onClick()}
        className='flex items-center justify-center gap-2 text-lg hover:scale-103 hover:shadow-lg'
        variant={variant}
        title={text}
      >
        <i className={`bx bx-sm bx-${icon}`} />
        {text}
      </Button>
    </div>
  )
}

const ContentSwitcher: FC<Props> = ({ response, categoryDetail, payConfig, error }) => {
  const { t } = useTranslation('common')
  const { query, isQueryChanged, clean, isOnlyPageChanged } = useListingFilter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { listings, isLoading, refetch, nextPage, error: apiError } = useListings(query, response)
  const { push, immediatePush } = useListingPusher()
  const active = useMemo(() => {
    return query.filter.v ? query.filter.v : 'list'
  }, [query.filter])
  const debouncedFilter = debounce((filter) => {
    if (isLoading || !!apiError) return
    if (isOnlyPageChanged) return nextPage(filter, listings.page + 1)
    console.log('sa::', filter)
    refetch(filter)
  }, 500)

  useEffect(() => {
    if (!isQueryChanged && !isOnlyPageChanged) return
    debouncedFilter(query.filter)
  }, [query])

  useEffect(() => {
    if (!error || !isValidationError(error)) return
    setErrorMessage(error.map((err) => err.message).join(', '))
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
    clean()
  }, [error])

  const toggleActive = (newActive: ContentType) => {
    if (newActive === 'list' && query.limit) {
      return immediatePush(deepMerge(query, { limit: undefined, page: 1, filter: { v: 'list' } }))
    } else if (newActive === 'map' && query.limit !== 1000) {
      immediatePush(deepMerge(query, { limit: 1000, page: 1, filter: { v: 'map' } }))
    }
  }

  const onCoordinateChange = (coordinates: Coordinates, zoom: number) => {
    push(deepMerge(query, { filter: { coordinates, distance: zoom } }))
  }

  if (active === 'list') {
    return (
      <CategoryDetailLayout categoryDetail={categoryDetail}>
        <PayConfigProvider initialComissionRate={payConfig?.comissionRate}>
          <ListingListSeo coordinates={query.filter.coordinates} />
          {errorMessage && (
            <div className='p-4 pb-0'>
              <Alert type='error' closable onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Alert>
            </div>
          )}
          <DynamicList data={listings} loading={isLoading} isNext={listings.isNext} />
          <FixedButton
            text={t('content-switch.map')}
            icon='map-alt'
            onClick={() => toggleActive('map')}
            variant='primary'
          />
        </PayConfigProvider>
      </CategoryDetailLayout>
    )
  }

  return (
    <CategoryDetailLayout categoryDetail={categoryDetail}>
      <PayConfigProvider initialComissionRate={payConfig?.comissionRate}>
        <ListingListSeo coordinates={query.filter.coordinates} />
        {errorMessage && (
          <div className='p-4 pb-0'>
            <Alert type='error' closable onClose={() => setErrorMessage(null)}>
              {errorMessage}
            </Alert>
          </div>
        )}
        <DynamicMap
          data={listings}
          loading={isLoading}
          onChange={onCoordinateChange}
          filterCoordinates={query.filter.coordinates}
          position={[41.0082, 28.9784]}
        />
        <FixedButton
          text={t('content-switch.list')}
          icon='list-ul'
          onClick={() => toggleActive('list')}
          variant='secondary'
        />
      </PayConfigProvider>
    </CategoryDetailLayout>
  )
}

export default ContentSwitcher
