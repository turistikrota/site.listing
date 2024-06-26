import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Input from '@turistikrota/ui/form/input'
import ErrorText from '@turistikrota/ui/text/error'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { useListingPusher } from '~/hooks/listing-pusher'

const ListingFilterDateGroup: FC = () => {
  const [startDate, setStartDate] = useState<string | undefined>(undefined)
  const [endDate, setEndDate] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const { t } = useTranslation('filter')
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  useEffect(() => {
    if (!query.filter.date) return
    if (
      query.filter.date.start &&
      query.filter.date.start !== startDate &&
      validateStartDate(new Date(query.filter.date.start))
    ) {
      setStartDate(query.filter.date.start)
    }
    if (
      query.filter.date.end &&
      query.filter.date.end !== endDate &&
      validateEndDate(new Date(query.filter.date.end))
    ) {
      setEndDate(query.filter.date.end)
    }
  }, [query])

  const validateStartDate = (date: Date | null, errorSet = false): boolean => {
    if (!date) {
      if (errorSet) setError(t('components.start-date.invalid'))
      return false
    }
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    if (date.getTime() < now.getTime()) {
      if (errorSet) setError(t('components.start-date.past'))
      return false
    }
    return true
  }

  const validateEndDate = (date: Date | null, errorSet = false): boolean => {
    if (!date) {
      if (errorSet) setError(t('components.end-date.invalid'))
      return false
    }
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    if (date.getTime() < now.getTime()) {
      if (errorSet) setError(t('components.end-date.past'))
      return false
    }
    const start = new Date(query.filter.date?.start || now)
    start.setHours(0, 0, 0, 0)
    if (date.getTime() < start.getTime()) {
      if (errorSet) setError(t('components.end-date.before-start'))
      return false
    }
    return true
  }

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const start = e.target.valueAsDate
    if (!validateStartDate(start, true)) return
    const endDate = new Date(query.filter.date?.end || new Date(start!).setDate(start!.getDate() + 1))
    push({
      ...query,
      filter: {
        ...query.filter,
        date: {
          start: start!.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
        },
      },
    })
    setStartDate(start!.toISOString().split('T')[0])
    setEndDate(endDate.toISOString().split('T')[0])
    setError(undefined)
  }

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const end = e.target.valueAsDate
    if (!validateEndDate(end, true)) return
    const start = new Date(query.filter.date?.start || new Date(end!).setDate(end!.getDate() - 1))
    push({
      ...query,
      filter: {
        ...query.filter,
        date: {
          start: start.toISOString().split('T')[0],
          end: end!.toISOString().split('T')[0],
        },
      },
    })
    setEndDate(end!.toISOString().split('T')[0])
    setStartDate(start.toISOString().split('T')[0])
    setError(undefined)
  }

  return (
    <div className='space-y-4'>
      <MobileInfoBox>{t('components.start-date.description')}</MobileInfoBox>
      <Input
        name='startDate'
        type='date'
        min={new Date().toISOString().split('T')[0]}
        max={endDate}
        autoComplete='start-date'
        label={t('components.start-date.label')}
        ariaLabel={t('components.start-date.label')}
        value={startDate}
        onChange={(e) => handleStartChange(e)}
      />
      <MobileInfoBox>{t('components.end-date.description')}</MobileInfoBox>
      <Input
        name='endDate'
        type='date'
        min={startDate}
        autoComplete='end-date'
        label={t('components.end-date.label')}
        ariaLabel={t('components.end-date.label')}
        value={endDate}
        onChange={(e) => handleEndChange(e)}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

export default ListingFilterDateGroup
