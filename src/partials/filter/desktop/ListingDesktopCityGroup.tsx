import { City, findCityByCoordinates, findNearestCity } from "@turistikrota/location-tr";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useListingFilter } from "~/contexts/listing.filter";
import { useListingPusher } from "~/hooks/listing-pusher";
import { deepMerge } from "~/utils/deepMerge";
import ListingFilterCityGroup from "../shared/ListingFilterCityGroup";
import ListingDesktopFilterContainer from "./ListingDesktopFilterContainer";
import ListingDesktopHead from "./ListingDesktopHead";

const ListingDesktopCityGroup : FC = () => {
    const [city, setCity] = useState<City | null>(null)
    const { t } = useTranslation('filter')
    const { query} = useListingFilter()
    const { push } = useListingPusher()

    useEffect(() => {
      if (query.filter.coordinates) {
        let city = findCityByCoordinates(query.filter.coordinates)
        if (!city) {
          city = findNearestCity(query.filter.coordinates)
          if (city) {
            push(deepMerge(query, { filter: { coordinates: city.coordinates } }))
          }
        }
        setCity(city)
      } else {
        setCity(null)
      }
    }, [query])

    const clearCity = () => {
      setCity(null)
      push(deepMerge(query, { filter: { coordinates: undefined } }))
    }

    return <ListingDesktopFilterContainer className='pt-4'>
              <ListingDesktopHead>
        <ListingDesktopHead.Title>
          {t('components.city-select.text')}
          {!!city && <span className='text-sm text-gray-500 ml-1'>({city.name})</span>}
        </ListingDesktopHead.Title>
        {!!city && <ListingDesktopHead.Clear onClear={clearCity} />}
      </ListingDesktopHead>
      <ListingFilterCityGroup className='max-h-60 mt-2' />
    </ListingDesktopFilterContainer>
}

export default ListingDesktopCityGroup