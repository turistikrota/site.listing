import { ListResponse } from "@turistikrota/ui"
import StickySection from "@turistikrota/ui/section/sticky"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useListingFilter } from "~/contexts/listing.filter"
import { ListingListItem } from "~/types/listing"
import ListingDesktopHead from "./ListingDesktopHead"
import ListingFilterSection from "./ListingFilterSection"

type Props = {
    data: ListResponse<ListingListItem> | null
}

const ListingDesktopFilterSection : FC<Props> = ({data}) => {
    const { t } = useTranslation('filter')
    const { isFiltered, clean } = useListingFilter()
  
    return (
      <StickySection innerClassName='rounded-md border bg-second'>
        <div className='border-b p-4 flex justify-between items-center'>
          <span className='text-gray-400'>
            {t('results', {
              count: data?.filteredTotal || 0,
            })}
          </span>
          {isFiltered && <ListingDesktopHead.Clear text={t('clear-filter')} onClear={() => clean()} />}
        </div>
  
        <div className='flex flex-col gap-4'>
          <ListingFilterSection />
        </div>
      </StickySection>
    )
}

export default ListingDesktopFilterSection