import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'
import ListingFilterCategoryGroup from '../shared/ListingFilterCategoryGroup'
import ListingDesktopFilterContainer from './ListingDesktopFilterContainer'
import ListingDesktopHead from './ListingDesktopHead'

const ListingDesktopCategoryGroup: FC = () => {
  const { t } = useTranslation('filter')
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  const clearCategories = () => {
    push({
      ...query,
      filter: {
        ...query.filter,
        categories: undefined,
      },
    })
  }

  return (
    <ListingDesktopFilterContainer>
      <ListingDesktopHead>
        <ListingDesktopHead.Title>{t('components.category.text')}</ListingDesktopHead.Title>
        {!!query.filter.categories && <ListingDesktopHead.Clear onClear={clearCategories} />}
      </ListingDesktopHead>
      <ListingFilterCategoryGroup />
    </ListingDesktopFilterContainer>
  )
}

export default ListingDesktopCategoryGroup
