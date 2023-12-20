import { DesktopInfoBox } from "@turistikrota/ui/accessibility/info";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useListingFilter } from "~/contexts/listing.filter";
import { useListingPusher } from "~/hooks/listing-pusher";
import { deepMerge } from "~/utils/deepMerge";
import ListingFilterQueryGroup from "../shared/ListingFilterQueryGroup";
import PlaceDesktopFilterContainer from "./ListingDesktopFilterContainer";
import ListingDesktopHead from "./ListingDesktopHead";

const ListingDesktopQueryGroup : FC = () => {
    const { t } = useTranslation('filter')
    const { query} = useListingFilter()
    const { push } = useListingPusher()
    const clearQuery = () => {
        push(deepMerge(query, { filter: { query: undefined } }))
      }
    
      return (
        <PlaceDesktopFilterContainer className='pt-4'>
          <ListingDesktopHead>
            <ListingDesktopHead.Title className='flex'>
              {t('components.query.text')}
              <DesktopInfoBox>{t('components.query.description')}</DesktopInfoBox>
            </ListingDesktopHead.Title>
            {!!query.filter.query && <ListingDesktopHead.Clear onClear={clearQuery} />}
          </ListingDesktopHead>
          <ListingFilterQueryGroup />
        </PlaceDesktopFilterContainer>
      )
}

export default ListingDesktopQueryGroup