import { ListResponse } from '@turistikrota/ui/types'
import { Services, apiUrl } from '~/config/services'
import { httpClient } from '~/utils/http'
import { ListingListItem } from '../types/listing'
import { ListingFilter, toFilterBody } from '../types/listing.filter'

export const filterListings = async (
  filter: ListingFilter,
  page = 1,
  limit = 10,
): Promise<ListResponse<ListingListItem>> => {
  const res = await httpClient
    .post(apiUrl(Services.Listing, `/filter?page=${page}&limit=${limit}`), toFilterBody(filter))
    .catch((err) => {
      return { data: undefined }
    })
  return res.data ? res.data : { list: [] }
}
