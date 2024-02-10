import { deepEqual, findDiff } from '@turistikrota/ui/utils'
import { useSearchParams } from 'next/navigation'
import { FC, PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PaginationRequest } from '~/types/pagination'
import { ListingFilter } from '../types/listing.filter'
import { getQueryFromSearchParams, toQueryString } from '../utils/listing.utils'

type ListingFilterContextType = {
  query: PaginationRequest<ListingFilter>
  setQuery: (query: PaginationRequest<ListingFilter>) => void
  clean: () => void
  isQueryChanged: boolean
  isOnlyPageChanged: boolean
  isFiltered: boolean
}

type Props = {
  initialQuery?: PaginationRequest<ListingFilter>
}

const ListingFilterContext = createContext<ListingFilterContextType | undefined>(undefined)

export const useListingFilter = (): ListingFilterContextType => {
  const context = useContext(ListingFilterContext)
  if (!context) {
    throw new Error('useListingFilter must be used within a ListingFilterProvider')
  }
  return context
}

export const ListingFilterProvider: FC<PropsWithChildren<Props>> = ({ children, initialQuery }) => {
  const [query, setQuery] = useState<PaginationRequest<ListingFilter>>(initialQuery || { filter: {} })
  const [isQueryChanged, setIsQueryChanged] = useState(false)
  const [isOnlyPageChanged, setIsOnlyPageChanged] = useState(false)
  const searchParams = useSearchParams()

  const onQueryChange = (newQuery: PaginationRequest<ListingFilter>) => {
    const oldQuery = { ...query }
    if (deepEqual(oldQuery, newQuery)) return
    let resetPage = false
    const diff = Object.keys(findDiff(oldQuery, newQuery))
    if (diff.length === 1 && diff.includes('page')) {
      setIsOnlyPageChanged(true)
      setIsQueryChanged(false)
    } else if (diff.length === 0 && !deepEqual(oldQuery.filter, newQuery.filter)) {
      setIsOnlyPageChanged(false)
      setIsQueryChanged(false)
    } else {
      resetPage = true
      setIsOnlyPageChanged(false)
      setIsQueryChanged(true)
    }
    if (resetPage) newQuery.page = 1
    setQuery(newQuery)
  }

  useEffect(() => {
    const newQuery = getQueryFromSearchParams(searchParams)
    if (query.page === newQuery.page && !deepEqual(query.filter, newQuery.filter)) {
      newQuery.page = 1
    }
    if (query && toQueryString(query) === toQueryString(newQuery)) return
    setQuery(newQuery)
  }, [])

  const clean = () => {
    setQuery({ filter: {} })
  }

  const contextValue = useMemo(() => {
    return {
      query,
      setQuery: onQueryChange,
      isQueryChanged,
      isOnlyPageChanged,
      clean,
      isFiltered: Object.keys(query.filter).filter((q) => !['sort', 'order'].includes(q)).length > 0,
    }
  }, [query, setQuery, isQueryChanged, isOnlyPageChanged])

  return <ListingFilterContext.Provider value={contextValue}>{children}</ListingFilterContext.Provider>
}
