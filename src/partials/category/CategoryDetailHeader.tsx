import Carousel from '@turistikrota/ui/carousel'
import ImagePreviewProvider, { useImagePreview } from '@turistikrota/ui/image/preview'
import ContentLoader from '@turistikrota/ui/loader'
import { mapAndSortImages } from '@turistikrota/ui/utils/image'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { CategoryMetaWithSeo, EmptyCategoryMetaWithSeo } from '~/api/category.api'
import { useCategoryDetail } from '~/hooks/category.detail'
import { getI18nTranslations } from '~/utils/i18n'
import CategoryDetailSeo from '../seo/CategoryDetailSeo'

type CarouselProps = {
  images: string[]
  altPrefix: string
}
const CategoryDetailCarousel: FC<CarouselProps> = ({ images, altPrefix }) => {
  const preview = useImagePreview()

  const openPreview = (_: string, idx: number) => {
    preview.show(idx)
  }

  return (
    <Carousel
      images={images}
      imageAltPrefix={altPrefix}
      onClick={openPreview}
      variant={Carousel.Variants.DetailHorizontal}
      showPreview
    />
  )
}

const CategoryDetailHeader: FC = () => {
  const { i18n } = useTranslation()
  const { details, loading } = useCategoryDetail()

  if (loading)
    return (
      <section className='h-104'>
        <ContentLoader noMargin />
      </section>
    )

  if (!details) return <></>

  return (
    <section className='mb-2'>
      <CategoryDetailSeo
        images={mapAndSortImages(details.images)}
        meta={getI18nTranslations<CategoryMetaWithSeo>(details.meta, i18n.language, EmptyCategoryMetaWithSeo)}
      />
      <ImagePreviewProvider
        altPrefix={getI18nTranslations<CategoryMetaWithSeo>(details.meta, i18n.language, EmptyCategoryMetaWithSeo).name}
        list={mapAndSortImages(details.images)}
      >
        <CategoryDetailCarousel
          images={mapAndSortImages(details.images)}
          altPrefix={
            getI18nTranslations<CategoryMetaWithSeo>(details.meta, i18n.language, EmptyCategoryMetaWithSeo).name
          }
        />
      </ImagePreviewProvider>
    </section>
  )
}

export default CategoryDetailHeader
