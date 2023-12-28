import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'
import { deepMerge } from '~/utils/deepMerge'
import ListingFilterPriceGroup from '../shared/ListingFilterPriceGroup'
import ListingDesktopFilterContainer from './ListingDesktopFilterContainer'
import ListingDesktopHead from './ListingDesktopHead'

const ListingDesktopPriceGroup: FC = () => {
  const { t } = useTranslation('filter')
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  const clearPrice = () => {
    push(
      deepMerge(query, {
        filter: {
          price: {
            min: undefined,
            max: undefined,
          },
        },
      }),
    )
  }

  return (
    <ListingDesktopFilterContainer>
      <ListingDesktopHead>
        <ListingDesktopHead.Title className='flex'>
          {t('components.price.text')}
          <DesktopInfoBox>{t('components.price.description')}</DesktopInfoBox>
        </ListingDesktopHead.Title>
        {!!query.filter.price && (!!query.filter.price.max || !!query.filter.price.min) && (
          <ListingDesktopHead.Clear onClear={clearPrice} />
        )}
      </ListingDesktopHead>
      <ListingFilterPriceGroup />
    </ListingDesktopFilterContainer>
  )
}

export default ListingDesktopPriceGroup
