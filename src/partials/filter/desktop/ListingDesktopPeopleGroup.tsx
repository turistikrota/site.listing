import { DesktopInfoBox } from "@turistikrota/ui/accessibility/info";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { useListingFilter } from "~/contexts/listing.filter";
import { useListingPusher } from "~/hooks/listing-pusher";
import { deepMerge } from "~/utils/deepMerge";
import ListingFilterPeopleGroup from "../shared/ListingFilterPeopleGroup";
import ListingDesktopFilterContainer from "./ListingDesktopFilterContainer";
import ListingDesktopHead from "./ListingDesktopHead";

const ListingDesktopPeopleGroup : FC = () => {
    const { t } = useTranslation('filter')
    const { query} = useListingFilter()
    const { push } = useListingPusher()

  const clearPeople = () => {
    push(deepMerge(query, { filter: { people: {
        adult: undefined,
        kid: undefined,
        baby: undefined
    } } }))
  }

  return (
    <ListingDesktopFilterContainer>
      <ListingDesktopHead>
        <ListingDesktopHead.Title className='flex'>
          {t('components.people.text')}
          <DesktopInfoBox>{t('components.people.description')}</DesktopInfoBox>
        </ListingDesktopHead.Title>
        {!!query.filter.people && (query.filter.people.adult || query.filter.people.baby || query.filter.people.kid) && <ListingDesktopHead.Clear onClear={clearPeople} />}
      </ListingDesktopHead>
      <ListingFilterPeopleGroup  />
    </ListingDesktopFilterContainer>
  )
}

export default ListingDesktopPeopleGroup