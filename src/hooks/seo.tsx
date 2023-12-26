import { Coordinates } from "@turistikrota/ui"
import { useTranslation } from "next-i18next"

type Result = {
    title: string
    description: string
    keywords: string
  }  

  type SeoProps = {
    coordinates?: Coordinates
  }

export const useListSeo = ({coordinates} : SeoProps) : Result => {
    const { t, i18n } = useTranslation('common')
    let title = t('seo.list.title')
    let description = t('seo.list.description')
    let keywords = t('seo.list.keywords')
    return {
        title,
        description,
        keywords
    }
}