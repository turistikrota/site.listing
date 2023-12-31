import { FC, PropsWithChildren } from 'react'
import { useCategoryDetail } from '~/hooks/category.detail'
import CategoryDetailFooter from '~/partials/category/CategoryDetailFooter'
import CategoryDetailHeader from '~/partials/category/CategoryDetailHeader'

type Props = {
  visible?: boolean
}

const CategoryDetailLayout: FC<PropsWithChildren<Props>> = ({ children }) => {
  useCategoryDetail()
  return (
    <>
      <CategoryDetailHeader />
      {children}
      <CategoryDetailFooter />
    </>
  )
}

export default CategoryDetailLayout
