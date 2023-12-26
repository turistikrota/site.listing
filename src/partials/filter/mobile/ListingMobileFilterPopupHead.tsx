import { deepMerge } from '@turistikrota/ui/utils'
import { useTranslation } from 'next-i18next'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'
import { ListingFilter } from '~/types/listing.filter'
import ListingFilterClearButton from '../shared/ListingFilterClearButton'

type Props = {
  title: string
  filterKey: keyof ListingFilter | null
  closeable?: boolean
  clearable?: boolean
  resultCount: number
  onClose: () => void
  onClearAll: () => void
}

type FilterComponent = React.FC<Props> & {
  TitleSection: typeof FilterTitleSection
  Title: typeof FilterTitle
  ClearButton: typeof ListingFilterClearButton
}

const FilterTitleSection: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className='flex justify-between items-center'>{children}</div>
}
const FilterTitle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <span className='text-2xl font-semibold'>{children}</span>
}

const FilterHead: FilterComponent = ({
  title,
  resultCount,
  filterKey,
  clearable = false,
  closeable = false,
  onClose,
  onClearAll,
}) => {
  const { t } = useTranslation('common')
  const { query } = useListingFilter()
  const {push} = useListingPusher()

  const clear = () => {
    if (filterKey) {
      push(deepMerge(query, { filter: { [filterKey]: undefined } }))
    }
  }
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          {closeable && (
            <span
              className='text-gray-600 dark:text-gray-300 mr-3 h-full flex items-center'
              onClick={onClose}
              role='button'
              title={t('ux.button.close')}
              aria-label={t('ux.button.close')}
            >
              <i className='bx bx-sm bx-arrow-back'></i>
            </span>
          )}
          <span className='text-2xl font-semibold'>{title}</span>
        </div>
        {filterKey && !!query.filter[filterKey] && <ListingFilterClearButton onClear={() => clear()} />}
        {!filterKey && clearable && <ListingFilterClearButton onClear={() => onClearAll()} text={t('ux.button.clear-filter')} />}
      </div>
      {!closeable && (
        <span className='text-gray-500 text-sm dark:text-gray-400'>
          {resultCount} {t('ux.label.result')}
        </span>
      )}
    </>
  )
}

FilterHead.TitleSection = FilterTitleSection
FilterHead.Title = FilterTitle
FilterHead.ClearButton = ListingFilterClearButton

export default FilterHead