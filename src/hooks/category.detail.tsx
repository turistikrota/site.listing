import { useState } from 'react'
import { CategoryDetail, fetchCategory } from '~/api/category.api'

type Result = {
  details: CategoryDetail | undefined
  loading: boolean
  sync: (uuid: string | undefined) => void
}

export const useCategoryDetail = (initial: CategoryDetail | undefined = undefined): Result => {
  const [details, setDetails] = useState<CategoryDetail | undefined>(initial)
  const [loading, setLoading] = useState<boolean>(false)

  const sync = (uuid: string | undefined = undefined) => {
    if (!uuid) return setDetails(undefined)
    if (uuid && details && details.uuid === uuid) return
    setLoading(true)
    fetchCategory(uuid)
      .then((res) => {
        setDetails(res)
      })
      .catch((err) => {
        setDetails(undefined)
        console.log('err::', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    details,
    loading,
    sync,
  }
}
