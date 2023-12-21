import { MobileInfoBox } from "@turistikrota/ui/accessibility/info"
import Input from "@turistikrota/ui/form/input"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { useListingFilter } from "~/contexts/listing.filter"
import { useListingPusher } from "~/hooks/listing-pusher"

const PeopleKeys = ['adult', 'kid', 'baby'] as const

type PeopleKey = typeof PeopleKeys[number]

type ItemProps = {
    defaultValue?: number
    info: string
    label: string
    name: string
    queryKey: PeopleKey
}

const ListingFilterPeopleItem : FC<ItemProps> = ({info, name, label, queryKey, defaultValue = 0}) => {
    const [value, setValue] = useState<number>(defaultValue)
    const { query } = useListingFilter()
    const { push } = useListingPusher()

    useEffect(() => {
      if (!!query.filter.validation && query.filter.validation[queryKey] && query.filter.validation[queryKey] !== value) {
        const val = (query.filter.validation ? query.filter.validation[queryKey] : 0) || 0
        setValue(Number.isNaN(+val) ? 0 : +val)
      } else if (query.filter.validation && !query.filter.validation[queryKey] && value !== 0) {
        setValue(0)
      }
    }, [query])
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = +e.target.value
      setValue(Number.isNaN(val) ? 0 : val)
      push({
        ...query,
        filter: {
          ...query.filter,
          validation: {
            ...query.filter.validation,
            [queryKey]: val,
          },
        },
      })
    }

    return (
      <>
        <MobileInfoBox>{info}</MobileInfoBox>
        <Input label={label} name={name} type="number" value={value} onChange={handleChange} />
      </>
    )
}

const ListingFilterPeopleGroup = () => {
    const { t } = useTranslation('filter')
    return <div className="space-y-4">
        {PeopleKeys.map(key => <ListingFilterPeopleItem key={key} info={t(`components.${key}.description`)} label={t(`components.${key}.label`)} name={key} queryKey={key} defaultValue={key === 'adult' ? 1 : 0} />)}
    </div>
}

export default ListingFilterPeopleGroup