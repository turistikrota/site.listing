import { DesktopInfoBox, MobileInfoBox } from "@turistikrota/ui/accessibility/info"
import Checkbox from "@turistikrota/ui/form/checkbox"
import { useIsDesktop } from "@turistikrota/ui/hooks/dom"
import { useTranslation } from "next-i18next"
import { FC, useEffect, useState } from "react"
import { useListingFilter } from "~/contexts/listing.filter"
import { useListingPusher } from "~/hooks/listing-pusher"

export const ValidationKeys = ['family', 'pet', 'smoke', 'alcohol', 'party', 'unmarried', 'guest'] as const

export type ValidationKey = typeof ValidationKeys[number]

type ItemProps = {
    defaultValue?: boolean
    info: string
    label: string
    name: string
    queryKey: ValidationKey
}

const ListingFilterBooleanItem : FC<ItemProps> = ({info, name, label, queryKey, defaultValue = false}) => {
    const [value, setValue] = useState<boolean>(defaultValue)
    const { query } = useListingFilter()
    const { push } = useListingPusher()
    const isDesktop = useIsDesktop()

    useEffect(() => {
        if (!!query.filter.validation && query.filter.validation[queryKey] && query.filter.validation[queryKey] !== value) {
          const val = (query.filter.validation ? query.filter.validation[queryKey] : false) || false
          setValue(typeof val === 'boolean' ? val : val === 'on')
        } else if (query.filter.validation && !query.filter.validation[queryKey] && value !== undefined) {
          setValue(false)
        }
      }, [query])
    
      const handleChange = (val: boolean | string) => {
        const boolValue = typeof val === 'boolean' ? val : val === 'on'
        setValue(boolValue)
        push({
          ...query,
          filter: {
            ...query.filter,
            validation: {
              ...query.filter.validation,
              [queryKey]: boolValue ? 'on': undefined,
            },
          },
        })
      }

      return <div>
              <MobileInfoBox>{info}</MobileInfoBox>
      <Checkbox name={name} id={name} onChange={handleChange} value={value === true} reversed={!isDesktop}>
        {label}
        <DesktopInfoBox>{info}</DesktopInfoBox>
      </Checkbox>
      </div>
}

const ListingFilterValidationGroup = () => {
    const { t } = useTranslation('filter')
    return <div className="space-y-2">
        {ValidationKeys.map(key => <ListingFilterBooleanItem key={key} info={t(`components.validation.${key}.description`)} label={t(`components.validation.${key}.label`)} name={key} queryKey={key} />)}
    </div>
}

export default ListingFilterValidationGroup