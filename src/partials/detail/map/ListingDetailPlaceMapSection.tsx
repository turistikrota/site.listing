import { Coordinates } from '@turistikrota/location-tr'
import { Icon, LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Circle, Marker, Popup } from 'react-leaflet'
import { PlaceListItem } from '~/api/place.api'
import MapDefaultConfig from '~/components/map/MapDefaultConfig'
import PlaceMapCard from '~/components/place/PlaceMapCard'

const DynamicMap = dynamic(() => import('~/components/map/MapDynamic'), {
  ssr: false,
})

type Props = {
  isStrict: boolean
  position: LatLngTuple
  listingCoordinates: Coordinates
  data: PlaceListItem[] | null
}

const ListingDetailPlaceMapSection: FC<Props> = ({ data, position, listingCoordinates, isStrict }) => {
  const { t } = useTranslation('listing')
  return (
    <div className='h-144 md:h-164'>
      <DynamicMap position={position} zoom={15}>
        <MapDefaultConfig />

        {isStrict && (
          <Marker
            position={listingCoordinates}
            icon={
              new Icon.Default({
                iconUrl: '/images/marker/red.png',
                iconSize: [48, 48],
                iconAnchor: [24, 48],
                iconRetinaUrl: '/images/marker/red.png',
              })
            }
          >
            <Popup
              className='map-popup flex items-center justify-center rounded-md bg-second p-2 text-center'
              closeButton={false}
            >
              <div className='w-full text-center'>{t('sections.map.strict')}</div>
            </Popup>
          </Marker>
        )}
        {!isStrict && <Circle center={listingCoordinates} radius={200} color='#2e99fd' />}

        {data &&
          data.map((item, idx) => (
            <Marker key={idx} position={item.coordinates}>
              <Popup className='map-popup'>
                <PlaceMapCard {...item} />
              </Popup>
            </Marker>
          ))}
      </DynamicMap>
    </div>
  )
}

export default ListingDetailPlaceMapSection
