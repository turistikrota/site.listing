import { Coordinates } from '@turistikrota/location-tr'
import { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
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
  return (
    <div className='h-144 md:h-164'>
      <DynamicMap position={position} zoom={15}>
        <MapDefaultConfig />

        {isStrict && <Marker position={listingCoordinates} />}
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
