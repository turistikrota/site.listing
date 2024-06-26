import Carousel from '@turistikrota/ui/carousel'
import { useImagePreview } from '@turistikrota/ui/image/preview'
import { FC } from 'react'

type Props = {
  images: string[]
  title: string
}

const ListingImagePreviewCard: FC<Props> = ({ images, title }) => {
  const preview = useImagePreview()

  const openPreview = (_: string, idx: number) => {
    preview.show(idx)
  }

  return (
    <Carousel
      imageAltPrefix={title}
      images={images}
      onClick={openPreview}
      autoPlay
      variant={Carousel.Variants.DetailVertical}
    />
  )
}

export default ListingImagePreviewCard
