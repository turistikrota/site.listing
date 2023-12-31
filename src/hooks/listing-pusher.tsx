import debounce from '@turistikrota/ui/utils/debounce'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useListingFilter } from '~/contexts/listing.filter'
import { ListingFilter } from '~/types/listing.filter'
import { PaginationRequest } from '~/types/pagination'
import { toQueryString } from '~/utils/listing.utils'

type PusherResult = {
  immediatePush: (query: PaginationRequest<ListingFilter>) => void
  push: (query: PaginationRequest<ListingFilter>) => void
}

export const useListingPusher = (): PusherResult => {
  const { setQuery } = useListingFilter()
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
    setQuery(query)
  }

  const push = (query: PaginationRequest<ListingFilter>) => {
    const path = toQueryString(query)
    debouncedPush(path)
    setQuery(query)
  }

  return {
    immediatePush,
    push,
  }
}

type DetailQuery = {
  start?: string
  end?: string
  adult?: number
  kid?: number
  baby?: number
}

type DetailPusher = (query: DetailQuery) => void

const toDetailQueryString = (query: DetailQuery): string => {
  const { start, end, adult, kid, baby } = query
  const params = []
  if (start) params.push(`start=${start}`)
  if (end) params.push(`end=${end}`)
  if (adult) params.push(`adult=${adult}`)
  if (kid) params.push(`kid=${kid}`)
  if (baby) params.push(`baby=${baby}`)
  return encodeURIComponent(params.join('&'))
}

export const useListingDetailPusher = (): DetailPusher => {
  const router = useRouter()
  const pathname = usePathname()

  const push = (query: DetailQuery) => {
    const path = `${pathname}?${toDetailQueryString(query)}`
    router.push(path, undefined, { shallow: true })
  }

  return push
}
