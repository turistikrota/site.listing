import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'
import { deepMerge } from '~/utils/deepMerge'
import ListingFilterDistanceGroup from '../shared/ListingFilterDistanceGroup'
import ListingDesktopFilterContainer from './ListingDesktopFilterContainer'
import ListingDesktopHead from './ListingDesktopHead'

const ListingDesktopDistanceGroup: FC = () => {
  const { t } = useTranslation('filter')
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  const clearDistance = () => {
    push(deepMerge(query, { filter: { distance: undefined } }))
  }

  return (
    <ListingDesktopFilterContainer>
      <ListingDesktopHead>
        <ListingDesktopHead.Title className='flex'>
          {t('components.distance.text')}
          <DesktopInfoBox>{t('components.distance.description')}</DesktopInfoBox>
        </ListingDesktopHead.Title>
        {!!query.filter.distance && <ListingDesktopHead.Clear onClear={clearDistance} />}
      </ListingDesktopHead>
      <ListingFilterDistanceGroup className='mt-2 max-h-40' />
    </ListingDesktopFilterContainer>
  )
}

export default ListingDesktopDistanceGroup
