import ContentLoader from '@turistikrota/ui/loader'
import { FC, PropsWithChildren } from 'react'
import { CategoryDetail } from '~/api/category.api'
import { useCategoryDetail } from '~/hooks/category.detail'
import CategoryDetailHeader from '~/partials/category/CategoryDetailHeader'

type Props = {
  categoryDetail?: CategoryDetail
}

const CategoryDetailLayout: FC<PropsWithChildren<Props>> = ({ children, categoryDetail }) => {
  const { details, loading } = useCategoryDetail(categoryDetail)
  return (
    <>
      {loading && (
        <div className='h-32'>
          <ContentLoader noMargin />
        </div>
      )}
      {!loading && details && <CategoryDetailHeader />}
      {children}
      {loading && (
        <div className='h-32'>
          <ContentLoader noMargin />
        </div>
      )}
      {!loading && details && <CategoryDetailHeader />}
    </>
  )
}

export default CategoryDetailLayout
