import ContentLoader from '@turistikrota/ui/loader'
import { FC } from 'react'
import { useCategoryDetail } from '~/hooks/category.detail'

const CategoryDetailHeader: FC = () => {
  const { details, loading } = useCategoryDetail()

  if (loading)
    return (
      <section className='h-20'>
        <ContentLoader noMargin />
      </section>
    )

  if (!details) return <></>

  return <section className='lg:pt-4'>header</section>
}

export default CategoryDetailHeader
