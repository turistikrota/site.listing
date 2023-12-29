import { City, useCities } from '@turistikrota/location-tr'
import Input from '@turistikrota/ui/form/input'
import Radio from '@turistikrota/ui/form/radio'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'
import ScrollableSection from '~/components/section/ScrollableSection'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'
import { deepMerge } from '~/utils/deepMerge'

type Props = {
  className?: string
}

const ListingFilterCityGroup: FC<Props> = ({ className }) => {
  const { t } = useTranslation('common')
  const [searchVal, setSearchVal] = useState<string | null>(null)
  const cities = useCities(searchVal)
  const { query } = useListingFilter()
  const { push } = useListingPusher()
  const isDesktop = useIsDesktop()

  const onSelectCity = (city: City, direction: boolean) => {
    if (query.filter.coordinates === city.coordinates) {
      push(deepMerge(query, { filter: { coordinates: undefined } }))
      return
    }
    const newCoordinates = direction ? city.coordinates : undefined
    push(deepMerge(query, { filter: { coordinates: newCoordinates } }))
  }
  return (
    <>
      <Input
        label={t('ux.input.search')}
        name='search'
        size={isDesktop ? 'md' : undefined}
        suffix={<i className='bx bx-xs bx-search-alt-2'></i>}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <ScrollableSection className={className}>
        {cities.map((city, idx) => (
          <Radio
            key={city.name}
            name='city'
            id={city.name}
            checked={
              query.filter.coordinates &&
              query.filter.coordinates[0] === city.coordinates[0] &&
              query.filter.coordinates[1] === city.coordinates[1]
            }
            reverse={!isDesktop}
            effect={isDesktop ? 'hover' : undefined}
            onChange={(e) => onSelectCity(city, e)}
          >
            {city.name}
          </Radio>
        ))}
      </ScrollableSection>
    </>
  )
}

export default ListingFilterCityGroup
