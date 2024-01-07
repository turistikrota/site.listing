import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { checkAvailability } from '~/api/booking.api'

type Result = {
  loading: boolean
  disabled: boolean
  error?: string
  submit: () => Promise<void>
}

export const useBookingCreator = (uuid: string, start?: string, end?: string): Result => {
  const { i18n, t } = useTranslation('listing')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const disabled = useMemo(() => !start || !end || loading, [start, end, loading])

  const onSubmit = async () => {
    if (!start || !end || loading) return
    setLoading(true)
    const [isAvailable, error] = await checkAvailability(uuid, start, end, i18n.language)
    setLoading(false)
    if (error) {
      setError(error)
      return
    }
    if (!isAvailable) {
      setError(t('status.unavailable'))
      return
    }
    setError(undefined)
  }

  return { loading, disabled, error, submit: onSubmit }
}
