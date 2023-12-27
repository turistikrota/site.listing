import { ListResponse } from '@turistikrota/ui/types'
import { Services, apiUrl } from '~/config/services'
import { ListingListItem } from '~/types/listing'
import { ListingFilter, toFilterBody } from '~/types/listing.filter'
import { PaginationRequest } from '~/types/pagination'
import { useQuery } from './query'

type UseListingsResult = {
  places: ListResponse<ListingListItem>
  isLoading: boolean
  error: unknown | null
  refetch: (params: any) => void
  nextPage: (params: any, page: number) => void
}

export const useListings = (
  query: PaginationRequest<ListingFilter>,
  initial?: ListResponse<ListingListItem>,
): UseListingsResult => {
  const {
    data: places,
    isLoading,
    error,
    refetch,
    nextPage,
  } = useQuery<ListResponse<ListingListItem>>(
    apiUrl(Services.Listing, `/filter?page=${query.page ?? 1}&limit=${query.limit ?? 9}`),
    {
      cache: false,
      method: 'POST',
      params:  toFilterBody(query.filter),
      withSSR: initial,
    },
  )
  return {
    places: places || {
      filteredTotal: 0,
      isNext: false,
      isPrev: false,
      list: [],
      page: 0,
      total: 0,
    },
    isLoading,
    error,
    refetch,
    nextPage,
  }
}
