import { ListingOrder, ListingSort } from "~/types/listing.filter"


type ListingSortHookResult = {
    defaultSort: ListingSort
    defaultOrder: ListingOrder
    sorts: ListingSort[]
    orders: ListingOrder[]
  }
  
  export const useListingSort = (): ListingSortHookResult => {
    return {
      defaultSort: ListingSort.Nearest,
      defaultOrder: ListingOrder.DESC,
      orders: Object.values(ListingOrder),
      sorts: Object.values(ListingSort),
    }
  }
  