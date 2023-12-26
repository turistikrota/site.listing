import { DesktopInfoBox } from "@turistikrota/ui/accessibility/info";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { useListingFilter } from "~/contexts/listing.filter";
import { useListingPusher } from "~/hooks/listing-pusher";
import { deepMerge } from "~/utils/deepMerge";
import ListingFilterValidationGroup, { ValidationKey, ValidationKeys } from "../shared/ListingFilterValidationGroup";
import ListingDesktopFilterContainer from "./ListingDesktopFilterContainer";
import ListingDesktopHead from "./ListingDesktopHead";

const ListingDesktopValidationGroup : FC = () => {
    const { t } = useTranslation('filter')
    const { query} = useListingFilter()
    const { push } = useListingPusher()

  const clearValidation = () => {
    push(deepMerge(query, { filter: { validation: {
        family: undefined,
        pet: undefined,
        smoke: undefined,
        alcohol: undefined,
        party: undefined,
        unmarried: undefined,
        guest: undefined
    } } }))
  }

  return (
    <ListingDesktopFilterContainer>
      <ListingDesktopHead>
        <ListingDesktopHead.Title className='flex'>
          {t('components.validation.text')}
          <DesktopInfoBox>{t('components.validation.description')}</DesktopInfoBox>
        </ListingDesktopHead.Title>
        {!!query.filter.validation && (Object.entries(query.filter.validation).some(([key, value]) => ValidationKeys.includes(key as ValidationKey) && !!value)) && <ListingDesktopHead.Clear onClear={clearValidation} />}
      </ListingDesktopHead>
      <ListingFilterValidationGroup  />
    </ListingDesktopFilterContainer>
  )
}

export default ListingDesktopValidationGroup