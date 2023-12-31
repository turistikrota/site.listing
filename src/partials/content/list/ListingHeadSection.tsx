import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { CategoryMetaWithSeo, EmptyCategoryMetaWithSeo } from '~/api/category.api'
import { useListingFilter } from '~/contexts/listing.filter'
import { useCategoryDetail } from '~/hooks/category.detail'
import { useListSeo } from '~/hooks/seo'
import { getI18nTranslations } from '~/utils/i18n'

type SeoTuple = {
  title: string
  description: string
}

const minimizeDescription = (description: string): string => {
  if (description.length < 100) return description
  const firstDotIndex = description.indexOf('.')
  if (firstDotIndex > 0) {
    return description.slice(0, firstDotIndex + 1)
  }
  return description.slice(0, 100) + '...'
}

const ListingHeadSection: React.FC = () => {
  const { details } = useCategoryDetail()
  const { query } = useListingFilter()
  const { title, description } = useListSeo({
    coordinates: query.filter.coordinates,
  })
  const { t, i18n } = useTranslation('place')

  const seo = useMemo<SeoTuple>(() => {
    if (details) return getI18nTranslations<CategoryMetaWithSeo>(details.meta, i18n.language, EmptyCategoryMetaWithSeo)
    return {
      title,
      description,
    }
  }, [details, title, description, i18n.language])
  return (
    <section className={`flex w-full items-center justify-between border-none pb-2`}>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-300'>{seo.title}</h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>{minimizeDescription(seo.description)}</p>
      </div>
    </section>
  )
}

export default ListingHeadSection
