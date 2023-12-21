import { useTranslation } from 'next-i18next'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListSeo } from '~/hooks/seo'
import ListingDesktopSortGroup from '~/partials/filter/desktop/ListingDesktopSortGroup'

const minimizeDescription = (description: string): string => {
  if (description.length < 100) return description
  const firstDotIndex = description.indexOf('.')
  if (firstDotIndex > 0) {
    return description.slice(0, firstDotIndex + 1)
  }
  return description.slice(0, 100) + '...'
}

const ListingHeadSection: React.FC = () => {
  const { query } = useListingFilter()
  const { title, description } = useListSeo({
    coordinates: query.filter.coordinates,
  })
  const { t } = useTranslation('place')
  return (
    <section className='flex items-center justify-between w-full border-none pt-0 lg:pt-4 pb-4'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-300'>{title}</h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>{minimizeDescription(description)}</p>
      </div>
      <ListingDesktopSortGroup />
    </section>
  )
}

export default ListingHeadSection
