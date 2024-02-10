import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
import { CategoryDetail, fetchCategory } from '~/api/category.api'

type CategoryDetailContextType = {
  details: CategoryDetail | undefined
  loading: boolean
  sync: (uuid: string | undefined) => void
}

type ProviderProps = {
  initial?: CategoryDetail
}

const CategoryDetailContext = createContext<CategoryDetailContextType>({
  details: undefined,
  loading: false,
  sync: () => {},
})

export const useCategoryDetail = () => useContext(CategoryDetailContext)

export const CategoryDetailProvider: FC<PropsWithChildren<ProviderProps>> = ({ initial, children }) => {
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
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return <CategoryDetailContext.Provider value={{ details, loading, sync }}>{children}</CategoryDetailContext.Provider>
}
