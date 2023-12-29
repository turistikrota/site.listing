import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { CategoryListItem, CategoryMeta, EmptyCategoryMeta } from '~/api/category.api'
import { getCategoryRoute } from '~/utils/category'
import { getI18nTranslations } from '~/utils/i18n'
import { mapAndSortImages } from '~/utils/listing.utils'

type Props = CategoryListItem

const ListingCategoryCard: FC<Props> = ({ meta, images }) => {
  const { t, i18n } = useTranslation('listing')
  const translations = useMemo(
    () => getI18nTranslations<CategoryMeta>(meta, i18n.language, EmptyCategoryMeta),
    [meta, i18n.language],
  )
  const imageUrl = useMemo<string>(() => mapAndSortImages(images)[0], [images])
  return (
    <Link
      href={getCategoryRoute(translations.slug, i18n.language)}
      className='duraiton-200 col-span-6 flex items-center justify-start gap-2 overflow-hidden text-ellipsis rounded-md bg-second p-2 transition-all hover:brightness-110 md:col-span-3'
    >
      <Image
        src={imageUrl}
        alt={translations.title}
        width={32}
        height={32}
        className='h-12 w-12 rounded-md bg-second object-cover '
      />
      <div className='flex flex-col overflow-hidden text-ellipsis'>
        <div className='overflow-hidden text-ellipsis text-base font-bold'>{translations.title}</div>
        <div className='text-sm'>{translations.name}</div>
      </div>
    </Link>
  )
}

export default ListingCategoryCard
