import { MobileInfoBox } from "@turistikrota/ui/accessibility/info"
import Input from "@turistikrota/ui/form/input"
import { useTranslation } from "next-i18next"
import { FC, useEffect, useState } from "react"
import { useListingFilter } from "~/contexts/listing.filter"
import { useListingPusher } from "~/hooks/listing-pusher"

const PriceKeys = ['min', 'max'] as const

type PriceKey = typeof PriceKeys[number]

type ItemProps = {
    defaultValue?: number | undefined
    info: string
    label: string
    name: string
    queryKey: PriceKey
}

const ListingFilterPriceItem : FC<ItemProps> = ({info, name, label, queryKey, defaultValue = undefined}) => {
    const [value, setValue] = useState<number | undefined>(defaultValue)
    const { query } = useListingFilter()
    const { push } = useListingPusher()

    useEffect(() => {
      if (!!query.filter.price && query.filter.price[queryKey] && query.filter.price[queryKey] !== value) {
        const val = (query.filter.price ? query.filter.price[queryKey] : undefined) || undefined
        setValue(Number.isNaN(val) ? undefined : val)
      } else if (query.filter.price && !query.filter.price[queryKey] && value !== undefined) {
        setValue(undefined)
      }
    }, [query])
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = +e.target.value
      setValue(Number.isNaN(val) ? undefined : val)
      push({
        ...query,
        filter: {
          ...query.filter,
          price: {
            ...query.filter.price,
            [queryKey]: Number.isNaN(val) ? undefined : val,
          },
        },
      })
    }

    return (
      <>
        <MobileInfoBox>{info}</MobileInfoBox>
        <Input label={label} name={name} type="number" min={0} value={value} onChange={handleChange} />
      </>
    )
}

const ListingFilterPriceGroup = () => {
    const { t } = useTranslation('filter')
    return <div className="space-y-4">
        {PriceKeys.map(key => <ListingFilterPriceItem key={key} info={t(`components.price.${key}.description`)} label={t(`components.price.${key}.label`)} name={key} queryKey={key} />)}
    </div>
}

export default ListingFilterPriceGroup