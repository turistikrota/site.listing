import { Locales } from '@turistikrota/ui'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { checkAvailability, createBooking, isCreateErrorResult, isCreateOkResult } from '~/api/booking.api'
import { SiteUrls } from '~/static/site'
import { getAccountRedirectUrl } from '~/utils/auth'

type Result = {
  loading: boolean
  disabled: boolean
  error?: string
  submit: () => Promise<void>
}

type Params = {
  uuid: string
  adult: number
  kid?: number
  baby?: number
  start?: string
  end?: string
}

export const useBookingCreator = ({ uuid, adult, kid, baby, start, end }: Params): Result => {
  const { i18n, t } = useTranslation('listing')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const disabled = useMemo(() => !start || !end || loading, [start, end, loading])

  const onSubmit = async () => {
    if (!start || !end || loading) return
    setLoading(true)
    const [isAvailable, error] = await checkAvailability(uuid, start, end, i18n.language)
    if (error) {
      setLoading(false)
      setError(error)
      return
    }
    if (!isAvailable) {
      setLoading(false)
      setError(t('status.unavailable'))
      return
    }
    const result = await createBooking({ uuid, start, end, adult, kid, baby })
    if (isCreateErrorResult(result)) {
      if (result.status === 401) {
        window.open(getAccountRedirectUrl(i18n.language, window.location.href))
      } else {
        setError(result.message)
      }
      return
    }
    if (isCreateOkResult(result)) {
      window.open(`${SiteUrls.booking[i18n.language as Locales]}/${result.uuid}`, '_self')
    }
    setLoading(false)
    setError(undefined)
  }

  return { loading, disabled, error, submit: onSubmit }
}
