import { Coordinates } from '@turistikrota/ui'
import { useTranslation } from 'next-i18next'

type Result = {
  title: string
  description: string
  keywords: string
}

type SeoProps = {
  coordinates?: Coordinates
}

export const useListSeo = ({ coordinates }: SeoProps): Result => {
  const { t, i18n } = useTranslation('common')
  const title = t('seo.list.title')
  const description = t('seo.list.description')
  const keywords = t('seo.list.keywords')
  return {
    title,
    description,
    keywords,
  }
}
