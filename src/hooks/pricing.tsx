import { useTranslation } from 'next-i18next'
import { Currency } from '~/types/listing'

export const useLocalizedFormatter = (currency?: Currency): Intl.NumberFormat => {
  const { i18n } = useTranslation()
  return new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: currency ? currency : Currency.TRY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}
