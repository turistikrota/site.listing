import { FC, PropsWithChildren } from 'react'
import { CategoryDetail } from '~/api/category.api'
import { CategoryDetailProvider } from '~/hooks/category.detail'

type Props = {
  categoryDetail?: CategoryDetail
}

const CategoryDetailLayout: FC<PropsWithChildren<Props>> = ({ children, categoryDetail }) => {
  return <CategoryDetailProvider initial={categoryDetail}>{children}</CategoryDetailProvider>
}

export default CategoryDetailLayout
