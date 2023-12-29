import Input from '@turistikrota/ui/form/input'
import ErrorText from '@turistikrota/ui/text/error'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, FC, useState } from 'react'

type Props = {
  startDate?: string
  endDate?: string
  onStartChange: (date?: string) => void
  onEndChange: (date?: string) => void
}

const ListingDetailDateInput: FC<Props> = ({ endDate, startDate, onEndChange, onStartChange }) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const { t } = useTranslation('filter')

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
    const start = new Date(startDate || now)
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
    const end = new Date(endDate || new Date(start!).setDate(start!.getDate() + 1))
    onStartChange(start!.toISOString().split('T')[0])
    onEndChange(end.toISOString().split('T')[0])
    setError(undefined)
  }

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const end = e.target.valueAsDate
    if (!validateEndDate(end, true)) return
    const start = new Date(startDate || new Date(end!).setDate(end!.getDate() - 1))
    onEndChange(end!.toISOString().split('T')[0])
    onStartChange(start.toISOString().split('T')[0])
    setError(undefined)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-full items-center gap-1'>
        <Input
          name='startDate'
          type='date'
          min={new Date().toISOString().split('T')[0]}
          max={endDate}
          autoComplete='start-date'
          label={t('components.start-date.labelDetail')}
          ariaLabel={t('components.start-date.labelDetail')}
          value={startDate}
          onChange={(e) => handleStartChange(e)}
        />
        <div>
          <i className='bx bx-arrow-to-right text-2xl'></i>
        </div>
        <Input
          name='endDate'
          type='date'
          min={startDate}
          autoComplete='end-date'
          label={t('components.end-date.labelDetail')}
          ariaLabel={t('components.end-date.labelDetail')}
          value={endDate}
          onChange={(e) => handleEndChange(e)}
        />
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

export default ListingDetailDateInput
