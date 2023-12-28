import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Input from '@turistikrota/ui/form/input'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useState } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'

const ListingFilterQueryGroup: FC = () => {
  const [word, setWord] = useState<string>('')
  const { t } = useTranslation('filter')
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  useEffect(() => {
    if (!!query.filter.query && query.filter.query !== word) {
      setWord(query.filter.query)
    } else if (!query.filter.query && word !== '') {
      setWord('')
    }
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
    push({
      ...query,
      filter: {
        ...query.filter,
        query: e.target.value,
      },
    })
  }

  return (
    <>
      <MobileInfoBox>{t('components.query.description')}</MobileInfoBox>
      <Input label={t('components.query.label')} name='word' value={word} onChange={handleChange} />
    </>
  )
}

export default ListingFilterQueryGroup
