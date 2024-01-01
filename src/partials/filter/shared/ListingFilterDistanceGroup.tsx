import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Radio from '@turistikrota/ui/form/radio'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { deepMerge } from '@turistikrota/ui/utils'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useMemo, useState } from 'react'
import ScrollableSection from '~/components/section/ScrollableSection'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'
import { Distance } from '~/types/listing.filter'

const DefaultDistance = 7

type Props = {
  className?: string
}

const calculateRadius = (lat: number, zoomLevel: number): number => {
  return ((40075016.686 * Math.abs(Math.cos((lat * Math.PI) / 180))) / Math.pow(2, zoomLevel + 8)) * 1000
}

const DefaultDistanceLabels: Record<Distance, string> = {
  7: '500 km',
  8: '300 km',
  9: '200 km',
  10: '100 km',
  11: '80 km',
  12: '60 km',
  13: '40 km',
  14: '20 km',
  15: '10 km',
  16: '5 km',
  17: '3 km',
  18: '2 km',
}

const getRadiusLabel = (zoomLevel: number): string => {
  const radius = zoomLevel
  if (radius >= 1000) {
    return `${Math.round(radius / 1000)} km`
  }
  return `${Math.round(radius)} m`
}

const ListingFilterDistanceGroup: FC<Props> = ({ className }) => {
  const [distance, setDistance] = useState<number>(DefaultDistance)
  const { t } = useTranslation('filter')
  const isDesktop = useIsDesktop()
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  const DistanceLabels: Record<Distance, string> = useMemo(() => {
    if (!query.filter.coordinates) {
      return DefaultDistanceLabels
    }
    const latitude = query.filter.coordinates[0]
    return {
      7: getRadiusLabel(calculateRadius(latitude, 7)),
      8: getRadiusLabel(calculateRadius(latitude, 8)),
      9: getRadiusLabel(calculateRadius(latitude, 9)),
      10: getRadiusLabel(calculateRadius(latitude, 10)),
      11: getRadiusLabel(calculateRadius(latitude, 11)),
      12: getRadiusLabel(calculateRadius(latitude, 12)),
      13: getRadiusLabel(calculateRadius(latitude, 13)),
      14: getRadiusLabel(calculateRadius(latitude, 14)),
      15: getRadiusLabel(calculateRadius(latitude, 15)),
      16: getRadiusLabel(calculateRadius(latitude, 16)),
      17: getRadiusLabel(calculateRadius(latitude, 17)),
      18: getRadiusLabel(calculateRadius(latitude, 18)),
    }
  }, [query.filter.coordinates])

  useEffect(() => {
    if (query.filter.distance !== distance) {
      const newDistance = query.filter.distance || DefaultDistance
      setDistance(newDistance)
      push(deepMerge(query, { filter: { distance: newDistance } }))
    }
  }, [query])

  const handleChange = (dist: number, direction: boolean) => {
    setDistance(dist)
    push(deepMerge(query, { filter: { distance: direction ? dist : undefined } }))
  }

  return (
    <>
      <MobileInfoBox>{t('components.distance.description')}</MobileInfoBox>
      <ScrollableSection className={className}>
        {Object.entries(DistanceLabels).map(([dist, label]) => (
          <Radio
            key={dist}
            name='distance'
            id={`distance-${dist}`}
            checked={distance === +dist}
            reverse={!isDesktop}
            effect={isDesktop ? 'hover' : undefined}
            onChange={(e) => handleChange(+dist, e)}
          >
            {label}
          </Radio>
        ))}
      </ScrollableSection>
    </>
  )
}

export default ListingFilterDistanceGroup
