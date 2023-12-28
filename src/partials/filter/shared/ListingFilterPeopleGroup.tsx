import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Input from '@turistikrota/ui/form/input'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useState } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'

const PeopleKeys = ['adult', 'kid', 'baby'] as const

type PeopleKey = (typeof PeopleKeys)[number]

type ItemProps = {
  defaultValue?: number
  info: string
  label: string
  name: string
  queryKey: PeopleKey
}

const ListingFilterPeopleItem: FC<ItemProps> = ({ info, name, label, queryKey, defaultValue = 0 }) => {
  const [value, setValue] = useState<number>(defaultValue)
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  useEffect(() => {
    if (!!query.filter.people && query.filter.people[queryKey] && query.filter.people[queryKey] !== value) {
      const val = (query.filter.people ? query.filter.people[queryKey] : 0) || 0
      setValue(Number.isNaN(+val) ? 0 : +val)
    } else if (query.filter.people && !query.filter.people[queryKey] && value !== 0) {
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
        people: {
          ...query.filter.people,
          [queryKey]: val,
        },
      },
    })
  }

  return (
    <>
      <MobileInfoBox>{info}</MobileInfoBox>
      <Input label={label} name={name} type='number' value={value} onChange={handleChange} />
    </>
  )
}

const ListingFilterPeopleGroup = () => {
  const { t } = useTranslation('filter')
  return (
    <div className='space-y-4'>
      {PeopleKeys.map((key) => (
        <ListingFilterPeopleItem
          key={key}
          info={t(`components.people.${key}.description`)}
          label={t(`components.people.${key}.label`)}
          name={key}
          queryKey={key}
          defaultValue={key === 'adult' ? 1 : 0}
        />
      ))}
    </div>
  )
}

export default ListingFilterPeopleGroup
