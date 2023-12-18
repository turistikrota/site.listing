import debounce from "@turistikrota/ui/utils/debounce"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import { ListingFilter } from "~/types/listing.filter"
import { PaginationRequest } from "~/types/pagination"
import { toQueryString } from "~/utils/listing.utils"

type PusherResult = {
    immediatePush: (query: PaginationRequest<ListingFilter>) => void
    push: (query: PaginationRequest<ListingFilter>) => void
}

export const useListingPusher = () : PusherResult=> {
    const pathname = usePathname()
    const router = useRouter()

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

        return {
            immediatePush,
            push
        }
}