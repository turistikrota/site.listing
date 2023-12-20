import { DesktopInfoBox } from "@turistikrota/ui/accessibility/info";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useListingFilter } from "~/contexts/listing.filter";
import { useListingPusher } from "~/hooks/listing-pusher";
import { deepMerge } from "~/utils/deepMerge";
import ListingFilterDistanceGroup from "../shared/ListingFilterDistanceGroup";
import ListingDesktopFilterContainer from "./ListingDesktopFilterContainer";
import ListingDesktopHead from "./ListingDesktopHead";

const ListingDesktopDistanceGroup : FC = () => {
    const { t } = useTranslation('filter')
    const { query} = useListingFilter()
    const { push } = useListingPusher()

  const clearDistance = () => {
    push(deepMerge(query, { filter: { distance: undefined } }))
  }

  return (
    <ListingDesktopFilterContainer>
      <ListingDesktopHead>
        <ListingDesktopHead.Title className='flex'>
          {t('components.distance.text')}
          <DesktopInfoBox>{t('components.distance.description')}</DesktopInfoBox>
        </ListingDesktopHead.Title>
        {!!query.filter.distance && <ListingDesktopHead.Clear onClear={clearDistance} />}
      </ListingDesktopHead>
      <ListingFilterDistanceGroup className='max-h-40 mt-2' />
    </ListingDesktopFilterContainer>
  )
}

export default ListingDesktopDistanceGroup