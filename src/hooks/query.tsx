import { deepEqual } from '@turistikrota/ui/utils'
import { useCallback, useEffect, useState } from 'react'
import { httpClient } from '~/utils/http'

type UseQueryResult<T = unknown> = {
  data: T | null
  isLoading: boolean
  error: unknown | null
  refetch: (params: any) => void
  nextPage: (params: any, page: number) => void
}

type CacheEntity<T = unknown> = {
  data: T
  expiresAt: number
  params: any
}

type Options<T> = {
  cache?: boolean
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: any
  withSSR?: T
}

export const useQuery = <T = unknown,>(
  defaultUrl: string,
  opts: Options<T> = { cache: false, withSSR: undefined },
): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(opts.withSSR || null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(
    (skipCache = false, params?: any, page?: number) => {
      return fetcher(defaultUrl, skipCache, params, page)
    },
    [defaultUrl],
  )

  const fetcher = (url: string, skipCache = false, params?: any, page?: number) => {
    let cached = false
    setIsLoading(true)
    if (!skipCache && typeof window !== 'undefined') {
      const cacheData = localStorage.getItem(url)
      if (cacheData) {
        const cacheEntity: CacheEntity<T> = JSON.parse(cacheData)
        if (cacheEntity.expiresAt > Date.now() && deepEqual(cacheEntity.params, params)) {
          cached = true
          setData(cacheEntity.data)
          setIsLoading(false)
          return
        }
      }
    }
    if (cached) return
    let promise
    if (opts && opts.method === 'POST') {
      promise = httpClient.post(url, params)
    } else {
      promise = httpClient.get(url)
    }
    promise
      .then((res) => {
        if (page) {
          setData((prevData: any) => ({
            ...res.data,
            list: [...prevData.list, ...res.data.list],
          }))
        } else {
          setData(res.data)
        }
        if (opts.cache && typeof window !== 'undefined') {
          const cacheEntity: CacheEntity<T> = {
            data: res.data,
            expiresAt: Date.now() + 1000 * 60 * 60 * 24,
            params: params,
          }
          localStorage.setItem(url, JSON.stringify(cacheEntity))
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          setError(err.response.data)
        } else {
          setError(err)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (opts.withSSR) return
    fetchData(false, opts.params)
  }, [defaultUrl])

  return {
    data,
    isLoading,
    error,
    refetch: (params: any) => fetchData(true, params),
    nextPage: (params: any, page: number) => fetchData(true, params, page),
  }
}
