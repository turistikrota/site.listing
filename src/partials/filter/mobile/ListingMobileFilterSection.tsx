import { FC, useState } from 'react'
import { ContentProps } from '../ListingFilter.types'
import ListingMobileFilterPopup from './ListingMobileFilterPopup'
import ListingMobileFilterSortPopup from './ListingMobileFilterSortPopup'
import FilterPopupSwitcher from './ListingMobileFilterSwitcher'

const ListingMobileFilterSection: FC<ContentProps> = (props) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  return (
    <>
      <FilterPopupSwitcher onFilterOpen={() => setFilterOpen(true)} onSortOpen={() => setSortOpen(true)} />
      <ListingMobileFilterPopup open={filterOpen} onClose={() => setFilterOpen(false)} {...props} />
      <ListingMobileFilterSortPopup open={sortOpen} onClose={() => setSortOpen(false)} />
    </>
  )
}

export default ListingMobileFilterSection
