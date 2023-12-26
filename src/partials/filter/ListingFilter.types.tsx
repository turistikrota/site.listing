import { ListResponse } from "@turistikrota/ui"
import { ListingListItem } from "~/types/listing"

export type ContentProps = {
    loading: boolean
    data: ListResponse<ListingListItem> | null
    onNextPage?: () => void
  }