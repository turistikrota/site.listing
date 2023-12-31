import Carousel from '@turistikrota/ui/carousel'
import Link from 'next/link'
import { FC, MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { useListingFilter } from '~/contexts/listing.filter'
import { EmptyListingMeta, ListingListItem, ListingMeta } from '~/types/listing'
import { getI18nTranslations } from '~/utils/i18n'
import ListingCardBusinessSection from './sections/ListingCardBusinessSection'
import ListingCardLocationSection from './sections/ListingCardLocationSection'
import ListingCardPriceSection from './sections/ListingCardPriceSection'

type Props = ListingListItem

const ListingMapCard: FC<Props> = ({ uuid, meta, business, images, location, prices }) => {
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
          images={[
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-edca9f0d.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-f1b2a19c.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-cdd2305f.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-0fd3091b.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-95e8ce06.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-4a458e1e.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-350a3d74.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-88060728.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-b2a22463.webp',
            'https://s3.turistikrota.com/places/mall-of-istanbul-avrupa-nin-alisveris-ve-eglence-merkezi-f0ae273d.webp',
          ]}
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
