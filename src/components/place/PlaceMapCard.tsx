import { Locales } from '@turistikrota/ui'
import Carousel from '@turistikrota/ui/carousel'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, MouseEventHandler } from 'react'
import { PlaceListItem, TranslationItem } from '~/api/place.api'
import { SiteUrls } from '~/static/site'
import { getI18nTranslations } from '~/utils/i18n'
import { mapAndSortImages } from '~/utils/listing.utils'
import TimeSpentCard from './PlaceTimeSpentCard'
import PlaceTypeCard from './PlaceTypeCard'

type Props = PlaceListItem

const PlaceMapCard : FC<Props> = ({ ...item }) => {
  const { i18n } = useTranslation('place')
  const translations = getI18nTranslations<TranslationItem>(item.translations, i18n.language, {
    title: '',
    slug: '',
    description: '',
  })

  const checkOutsideClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // @ts-ignore
    if (['i', 'button'].includes(e.target?.tagName.toLowerCase())) return e.preventDefault()
  }

  return (
    <div className='flex flex-col bg-default rounded-md'>
      <Link href={`${SiteUrls.place[i18n.language as Locales]}/${translations.slug}`} target='_blank' onClick={checkOutsideClick}>
        <Carousel
          imageAltPrefix={translations.title}
          images={mapAndSortImages(item.images)}
          imageClassName='rounded-b-none'
          sizeClassName='h-75 w-75'
        />

        <div className='flex flex-col gap-2 p-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <div className='text-xl font-bold text-gray-900 dark:text-gray-100'>{translations.title}</div>
              <div className='flex justify-between items-center'>
                <PlaceTypeCard type={item.type} />
                <TimeSpentCard data={item.averageTimeSpent} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PlaceMapCard