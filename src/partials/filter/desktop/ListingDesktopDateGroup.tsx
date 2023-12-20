import { DesktopInfoBox } from "@turistikrota/ui/accessibility/info";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useListingFilter } from "~/contexts/listing.filter";
import { useListingPusher } from "~/hooks/listing-pusher";
import { deepMerge } from "~/utils/deepMerge";
import ListingFilterDateGroup from "../shared/ListingFilterDateGroup";
import ListingDesktopFilterContainer from "./ListingDesktopFilterContainer";
import ListingDesktopHead from "./ListingDesktopHead";

const ListingDesktopDateGroup : FC = () => {
    const { t } = useTranslation('filter')
    const { query} = useListingFilter()
    const { push } = useListingPusher()

  const clearDate = () => {
    push(deepMerge(query, { filter: {
        start_date: undefined,
        end_date: undefined
    } }))
  }

  return (
    <ListingDesktopFilterContainer>
      <ListingDesktopHead>
        <ListingDesktopHead.Title className='flex'>
          {t('components.date.text')}
          <DesktopInfoBox>{t('components.date.description')}</DesktopInfoBox>
        </ListingDesktopHead.Title>
        {(query.filter.start_date || query.filter.end_date) && <ListingDesktopHead.Clear onClear={clearDate} />}
      </ListingDesktopHead>
      <ListingFilterDateGroup  />
    </ListingDesktopFilterContainer>
  )
}

export default ListingDesktopDateGroup