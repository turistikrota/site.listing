import Card from '@turistikrota/ui/cards/default'
import Carousel from '@turistikrota/ui/carousel'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { EmptyListingMeta, ListingListItem, ListingMeta } from '~/types/listing'
import { getI18nTranslations } from '~/utils/i18n'
import { mapAndSortImages } from '~/utils/listing.utils'
import ListingCardBusinessSection from './sections/ListingCardBusinessSection'
import ListingCardLocationSection from './sections/ListingCardLocationSection'
import ListingCardPriceSection from './sections/ListingCardPriceSection'

type Props = ListingListItem

const ListingListCard: FC<Props> = ({
  uuid,
  meta,
  business,
  categoryUUIDs,
  features,
  images,
  location,
  prices,
  validation,
}) => {
  const { i18n } = useTranslation()
  const translations = getI18nTranslations<ListingMeta>(meta, i18n.language, EmptyListingMeta)
  return (
    <Card
      noPadding
      className={`flex flex-col hover:border-primary transition-colors duration-200 col-span-12 md:col-span-4`}
    >
      <div className='flex h-full flex-col'>
        <Carousel
          imageAltPrefix=''
          images={mapAndSortImages(images)}
          sizeClassName='h-72'
          imageClassName='rounded-b-none'
          imgLoadingClassName='rounded-t-md'
        />
        <div className='flex h-full flex-col justify-between p-2'>
          <div className='flex flex-col gap-2'>
            <div className='line-clamp-2 text-xl font-bold'>{translations.title}</div>
            <div className='text-sm overflow-hidden text-ellipsis'>{translations.description}</div>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-2 px-2'>
          <ListingCardPriceSection prices={prices} />
        <ListingCardLocationSection city={location.city} street={location.street} />
        <ListingCardBusinessSection nickName={business.nickName} />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <div>
            </div>
            <div className='flex items-center justify-end'>right</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ListingListCard