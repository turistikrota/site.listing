import { type ListResponse } from '@turistikrota/ui'
import { useInfiniteScroll, useWindowWidth } from '@turistikrota/ui/hooks/dom'
import debounce from '@turistikrota/ui/utils/debounce'
import { FC } from 'react'
import ListingListCard from '~/components/listing/ListingListCard'
import NoResultsFound from '~/components/state/NoResultsFound'
import { useListingFilter } from '~/contexts/listing.filter'
import { useCategoryDetail } from '~/hooks/category.detail'
import { useListingPusher } from '~/hooks/listing-pusher'
import CategoryDetailFooter from '~/partials/category/CategoryDetailFooter'
import CategoryDetailHeader from '~/partials/category/CategoryDetailHeader'
import ListingDesktopSortGroup from '~/partials/filter/desktop/ListingDesktopSortGroup'
import { ListingListItem } from '~/types/listing'
import { deepMerge } from '~/utils/deepMerge'
import { ContentProps } from '../ContentSwitcher'
import ListFilterAside from './ListFilterAside'
import ListingHeadSection from './ListingHeadSection'

type Props = {
  isNext: boolean
  onNextPage?: () => void
} & ContentProps

type ItemProps = {
  isFiltered: boolean
  loading: boolean
  data: ListResponse<ListingListItem> | null
  onClear: () => void
  sortVisible: boolean
}

const ListItemSection: FC<ItemProps> = ({ data, loading, sortVisible, onClear, isFiltered }) => {
  const isWidthExist = useWindowWidth()
  return (
    <section className={`grid grow grid-cols-12 gap-2 md:h-full ${!isWidthExist ? 'ml-0 md:ml-80' : ''}`}>
      {sortVisible && (
        <div className='col-span-12 flex justify-end'>
          <ListingDesktopSortGroup />
        </div>
      )}
      {data && data.list.map((item, idx) => <ListingListCard key={idx} {...item} />)}
      {data && data.list.length === 0 && (
        <div className='col-span-12'>
          <NoResultsFound onResetFilters={onClear} isFiltered={isFiltered} />
        </div>
      )}
      {!sortVisible && <div className='md:pb-15 col-span-12 pb-20'></div>}
    </section>
  )
}

const ListingListContent: FC<Props> = ({ data, loading, isNext }) => {
  const { details } = useCategoryDetail()
  const { query, clean, isFiltered } = useListingFilter()
  const { push } = useListingPusher()

  const debouncedPush = debounce(() => {
    const newPage = (query.page || 1) + 1
    push(deepMerge(query, { page: newPage }))
  }, 100)

  const handleScroll = () => {
    if (!isNext) return
    debouncedPush()
  }

  useInfiniteScroll(handleScroll, loading, 10)
  return (
    <section className='mx-auto max-w-7xl p-2 lg:h-full xl:pb-0'>
      <>
        <ListingHeadSection sortVisible={!details} />
        <CategoryDetailHeader />
        <section className='flex flex-col gap-2 lg:flex-row'>
          <ListFilterAside data={data} loading={loading} />
          <ListItemSection
            sortVisible={!!details}
            data={data}
            loading={loading}
            onClear={clean}
            isFiltered={isFiltered}
          />
        </section>
        <CategoryDetailFooter />
      </>
    </section>
  )
}

export default ListingListContent
