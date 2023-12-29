import { FC } from 'react'
import ListingDesktopCategoryGroup from './ListingDesktopCategoryGroup'
import ListingDesktopCityGroup from './ListingDesktopCityGroup'
import ListingDesktopDateGroup from './ListingDesktopDateGroup'
import ListingDesktopDistanceGroup from './ListingDesktopDistanceGroup'
import ListingDesktopPeopleGroup from './ListingDesktopPeopleGroup'
import ListingDesktopPriceGroup from './ListingDesktopPriceGroup'
import ListingDesktopQueryGroup from './ListingDesktopQueryGroup'
import ListingDesktopValidationGroup from './ListingDesktopValidationGroup'

const ListingFilterSection: FC = () => {
  return (
    <>
      <ListingDesktopCategoryGroup />
      <ListingDesktopDateGroup />
      <ListingDesktopPeopleGroup />
      <ListingDesktopQueryGroup />
      <ListingDesktopValidationGroup />
      <ListingDesktopPriceGroup />
      <ListingDesktopCityGroup />
      <ListingDesktopDistanceGroup />
    </>
  )
}

export default ListingFilterSection
