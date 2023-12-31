import { useState } from 'react'
import { CategoryDetail } from '~/api/category.api'

type Result = {
  details: CategoryDetail | undefined
  loading: boolean
  sync: (uuid: string) => void | Promise<void>
}

export const useCategoryDetail = (initial: CategoryDetail | undefined = undefined): Result => {
  const [details, setDetails] = useState<CategoryDetail | undefined>(initial)
  const [loading, setLoading] = useState<boolean>(false)

  const sync = async (uuid: string) => {}

  return {
    details,
    loading,
    sync,
  }
}
