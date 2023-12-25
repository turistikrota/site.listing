import { useIsDesktop, useWindowWidth } from '@turistikrota/ui/hooks/dom'
import { FC } from "react"
import ListingDesktopFilterSection from "~/partials/filter/desktop/ListingDesktopFilterSection"
import ListingMobileFilterSection from '~/partials/filter/mobile/ListingMobileFilterSection'
import { ContentProps } from "../ContentSwitcher"

const ListFilterAside : FC<ContentProps> = (props) => {  
    const isWidthExist = useWindowWidth()
    const isDesktop = useIsDesktop()

  if (!isWidthExist) return <></>

  return <>
  
  {isDesktop && <ListingDesktopFilterSection {...props} />}
      {!isDesktop && <ListingMobileFilterSection {...props} />}
  </>
}

export default ListFilterAside