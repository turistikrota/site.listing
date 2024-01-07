import { useEffect, useState } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'

export const useListingDetailUrl = (slug: string): string => {
  const [params, setParams] = useState<string | null>(null)
  const { query } = useListingFilter()

  useEffect(() => {
    const params: string[] = []
    if (query.filter.date) {
      if (query.filter.date.start) params.push(`start=${query.filter.date.start}`)
      if (query.filter.date.end) params.push(`end=${query.filter.date.end}`)
    }
    if (query.filter.people) {
      if (query.filter.people.adult) params.push(`adult=${query.filter.people.adult}`)
      if (query.filter.people.kid) params.push(`kid=${query.filter.people.kid}`)
      if (query.filter.people.baby) params.push(`baby=${query.filter.people.baby}`)
    }
    if (params.length > 0) {
      setParams(params.join('&'))
    } else {
      setParams(null)
    }
  }, [query.filter])

  return `/${slug}${params ? `?${params}` : ''}`
}
