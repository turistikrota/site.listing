import Card from '@turistikrota/ui/cards/default'
import Carousel from '@turistikrota/ui/carousel'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { EmptyListingMeta, ListingListItem, ListingMeta } from '~/types/listing'
import { getI18nTranslations } from '~/utils/i18n'
import { mapAndSortImages } from '~/utils/listing.utils'

type Props = ListingListItem & {
  customGrid?: string
}

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
  customGrid = 'col-span-12 md:col-span-4',
}) => {
  const { i18n } = useTranslation()
  const translations = getI18nTranslations<ListingMeta>(meta, i18n.language, EmptyListingMeta)
  return (
    <Card
      noPadding
      className={`flex flex-col shadow-md transition-shadow duration-200 hover:shadow-lg dark:shadow-none dark:hover:shadow-none ${customGrid}`}
    >
      <div className='flex h-full flex-col'>
        <Carousel
          imageAltPrefix=''
          images={mapAndSortImages(images)}
          sizeClassName='h-72'
          imageClassName='rounded-b-none'
          imgLoadingClassName='rounded-t-md'
        />
        <div className='flex h-full flex-col justify-between p-4'>
          <div className='flex flex-col gap-2'>
            <div className='line-clamp-2 text-xl font-bold'>{translations.title}</div>
            <div className='text-sm'>{translations.description}</div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <div>left</div>
            <div className='flex items-center justify-end'>right</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ListingListCard