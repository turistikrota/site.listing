import { City, findCityByCoordinates, findNearestCity } from '@turistikrota/location-tr'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useState } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'
import { deepMerge } from '~/utils/deepMerge'
import ListingFilterCityGroup from '../shared/ListingFilterCityGroup'
import ListingDesktopFilterContainer from './ListingDesktopFilterContainer'
import ListingDesktopHead from './ListingDesktopHead'

const ListingDesktopCityGroup: FC = () => {
  const [city, setCity] = useState<City | null>(null)
  const { t } = useTranslation('filter')
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  useEffect(() => {
    if (query.filter.coordinates) {
      let city = findCityByCoordinates(query.filter.coordinates)
      if (!city) {
        city = findNearestCity(query.filter.coordinates)
        if (city) {
          push(deepMerge(query, { filter: { coordinates: city.coordinates, distance: 12 } }))
        }
      }
      setCity(city)
    } else {
      setCity(null)
    }
  }, [query])

  const clearCity = () => {
    setCity(null)
    push(deepMerge(query, { filter: { coordinates: undefined, distance: undefined } }))
  }

  return (
    <ListingDesktopFilterContainer>
      <ListingDesktopHead>
        <ListingDesktopHead.Title>
          {t('components.city-select.text')}
          {!!city && <span className='ml-1 text-sm text-gray-500'>({city.name})</span>}
        </ListingDesktopHead.Title>
        {!!city && <ListingDesktopHead.Clear onClear={clearCity} />}
      </ListingDesktopHead>
      <ListingFilterCityGroup className='mt-2 max-h-60' />
    </ListingDesktopFilterContainer>
  )
}

export default ListingDesktopCityGroup
