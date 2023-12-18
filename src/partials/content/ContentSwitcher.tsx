import Alert from '@turistikrota/ui/alert'
import Button from '@turistikrota/ui/button'
import { Coordinates, ListResponse, Variant } from '@turistikrota/ui/types'
import debounce from '@turistikrota/ui/utils/debounce'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListings } from '~/hooks/listings'
import { isValidationError } from '~/types/error'
import { ListingListItem } from '~/types/listing'
import { ContentType, ListingFilter } from '~/types/listing.filter'
import { PaginationRequest } from '~/types/pagination'
import { deepMerge } from '~/utils/deepMerge'
import { toQueryString } from '~/utils/listing.utils'
import ListingListSeo from '../seo/ListingListSeo'

type Props = {
  response?: ListResponse<ListingListItem>
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
    <div className='fixed bottom-6 right-1/2 transform translate-x-1/2 z-500 min-w-max'>
      <Button
        onClick={() => onClick()}
        className='hover:scale-103 hover:shadow-lg flex items-center justify-center gap-2 text-lg'
        variant={variant}
        title={text}
      >
        <i className={`bx bx-sm bx-${icon}`} />
        {text}
      </Button>
    </div>
  )
}

export default function ContentSwitcher({ response, error }: Props) {
  const { t } = useTranslation('common')
  const { query, isQueryChanged, clean, isOnlyPageChanged, isFiltered, setQuery } = useListingFilter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { places, isLoading, refetch, nextPage, error: apiError } = useListings(query, response)
  const pathname = usePathname()
  const router = useRouter()
  const active = useMemo(() => {
    return query.filter.v ? query.filter.v : 'list'
  }, [query.filter])
  const debouncedFilter = debounce(() => {
    if (isLoading || !!apiError) return
    if (isOnlyPageChanged) return nextPage(query.filter, places.page + 1)
    refetch(query.filter)
  }, 500)

  useEffect(() => {
    if (!isQueryChanged && !isOnlyPageChanged) return
    debouncedFilter()
  }, [query])

  useEffect(() => {
    if (!error || !isValidationError(error)) return
    setErrorMessage(error.map((err) => err.message).join(', '))
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
    clean()
  }, [error])

  const debouncedPush = debounce((path: string) => {
    const url = `${pathname}?${path}`
    router.push(url, undefined, { shallow: true })
  }, 500)

  const immediatePush = (query: PaginationRequest<ListingFilter>) => {
    const path = toQueryString(query)
    const url = `${pathname}?${path}`
    router.push(url, undefined, { shallow: true })
  }

  const push = (query: PaginationRequest<ListingFilter>) => {
    const path = toQueryString(query)
    debouncedPush(path)
  }

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
      <>
        <ListingListSeo coordinates={query.filter.coordinates}  />
        {errorMessage && (
          <div className='p-4 pb-0'>
            <Alert type='error' closable onClose={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          </div>
        )}
        <DynamicList data={places} loading={isLoading} isNext={places.isNext} />
        <FixedButton
          text={t('content-switch.map')}
          icon='map-alt'
          onClick={() => toggleActive('map')}
          variant='primary'
        />
      </>
    )
  }

  return (
    <>
      <ListingListSeo coordinates={query.filter.coordinates}  />
      {errorMessage && (
        <div className='p-4 pb-0'>
          <Alert type='error' closable onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </div>
      )}
      <DynamicMap
        data={places}
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
    </>
  )
}
