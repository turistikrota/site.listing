import { type ListResponse } from "@turistikrota/ui"
import { useInfiniteScroll, useWindowWidth } from "@turistikrota/ui/hooks/dom"
import debounce from "@turistikrota/ui/utils/debounce"
import { FC } from "react"
import ListingListCard from "~/components/listing/ListingListCard"
import NoResultsFound from "~/components/state/NoResultsFound"
import { useListingFilter } from "~/contexts/listing.filter"
import { useListingPusher } from "~/hooks/listing-pusher"
import { ListingListItem } from "~/types/listing"
import { deepMerge } from "~/utils/deepMerge"
import ListFilterAside from "./ListFilterAside"
import ListingHeadSection from "./ListingHeadSection"

type Props = {
    isNext: boolean
    loading: boolean
    data: ListResponse<ListingListItem> | null
    onNextPage?: () => void
}

type ItemProps = {
    isFiltered: boolean
    loading: boolean
    data: ListResponse<ListingListItem> | null
    onClear: () => void
}

const ListItemSection : FC<ItemProps> = ({ data, loading, onClear, isFiltered }) => {
    const isWidthExist = useWindowWidth()
    return   <section className={`grow grid grid-cols-12 gap-4 md:h-full ${!isWidthExist ? 'ml-0 md:ml-80' : ''}`}>
    {data && data.list.map((item, idx) => <ListingListCard key={idx} {...item} />)}
    {data && data.list.length === 0 && (
      <div className='col-span-12'>
        <NoResultsFound onResetFilters={onClear} isFiltered={isFiltered} />
      </div>
    )}
    <div className='pb-20 md:pb-10'></div>
  </section>
}

const ListingListContent : FC<Props> = ({data, loading, isNext}) => {
    const {query, clean, isFiltered} = useListingFilter()
    const {push } = useListingPusher()

    const debouncedPush = debounce(() => {
        const newPage = (query.page || 1) + 1
        push(deepMerge(query, { page: newPage }))
      }, 100)

    const handleScroll = () => {
        if (!isNext) return
        debouncedPush()
      }

  useInfiniteScroll(handleScroll, loading, 10)
    return <section className='max-w-7xl p-4 xl:py-0 mx-auto lg:h-full'>
    <ListingHeadSection />
    <section className='flex flex-col lg:flex-row gap-4'>
      <ListFilterAside data={data} loading={loading} />
      <ListItemSection data={data} loading={loading} onClear={clean} isFiltered={isFiltered} />
    </section>
  </section>
}

export default ListingListContent