import Carousel from '@turistikrota/ui/carousel'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, MouseEventHandler } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { EmptyListingMeta, ListingListItem, ListingMeta } from '~/types/listing'
import { getI18nTranslations } from '~/utils/i18n'
import { mapAndSortImages } from '~/utils/listing.utils'
import ListingCardBusinessSection from './sections/ListingCardBusinessSection'
import ListingCardLocationSection from './sections/ListingCardLocationSection'
import ListingCardPriceSection from './sections/ListingCardPriceSection'

type Props = ListingListItem

const ListingMapCard: FC<Props> = ({ uuid, meta, business, images, location, prices, currency }) => {
  const { i18n } = useTranslation()
  const { query } = useListingFilter()
  const translations = getI18nTranslations<ListingMeta>(meta, i18n.language, EmptyListingMeta)

  const checkOutsideClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // @ts-ignore
    if (['i', 'button'].includes(e.target?.tagName.toLowerCase())) return e.preventDefault()
  }

  return (
    <div className='flex flex-col rounded-md bg-default'>
      <Link href={translations.slug} target='_blank' onClick={checkOutsideClick}>
        <Carousel
          imageAltPrefix={translations.title}
          images={mapAndSortImages(images)}
          variant={Carousel.Variants.Map}
        />

        <div className='flex flex-col gap-2 p-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <div className='line-clamp-2 text-xl font-bold'>{translations.title}</div>
              <div className='overflow-hidden text-ellipsis text-sm'>{translations.description}</div>
              <div className='grid grid-cols-12 gap-2'>
                <ListingCardBusinessSection nickName={business.nickName} />
                <ListingCardLocationSection city={location.city} street={location.street} className='justify-end' />
                <ListingCardPriceSection
                  prices={prices}
                  currency={currency}
                  startDate={query.filter.date?.start}
                  endDate={query.filter.date?.end}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ListingMapCard
