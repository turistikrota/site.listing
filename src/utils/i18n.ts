import { I18nTranslation, isLocale } from '@turistikrota/ui/types'

export const getI18nTranslations = <T>(obj: I18nTranslation<T>, locale: string, fb: T): T => {
  if (isLocale(locale) && obj[locale]) {
    return obj[locale]
  }
  if (obj.en) {
    return obj.en
  }
  if (obj.tr) {
    return obj.tr
  }
  return fb
}