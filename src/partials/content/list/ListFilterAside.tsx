import type { ListResponse } from "@turistikrota/ui"
import { useIsDesktop, useWindowWidth } from '@turistikrota/ui/hooks/dom'
import { FC } from "react"
import ListingDesktopFilterSection from "~/partials/filter/desktop/ListingDesktopFilterSection"
import { ListingListItem } from "~/types/listing"

type Props = {
    loading: boolean
    data: ListResponse<ListingListItem> | null

}

const ListFilterAside : FC<Props> = ({
    loading, data
}) => {  const isWidthExist = useWindowWidth()
    const isDesktop = useIsDesktop()

  if (!isWidthExist) return <></>

  return <>
  
  {isDesktop && <ListingDesktopFilterSection data={data} loading={loading} />}
  </>
}

export default ListFilterAside