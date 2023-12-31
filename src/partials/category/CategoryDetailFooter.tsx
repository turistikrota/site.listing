import ContentLoader from '@turistikrota/ui/loader'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { useCategoryDetail } from '~/hooks/category.detail'
import { getI18nTranslations } from '~/utils/i18n'
import CategoryDetailMarkdownSection from './CategoryDetailMarkdownSection'

const CategoryDetailFooter: FC = () => {
  const { i18n } = useTranslation()
  const { details, loading } = useCategoryDetail()

  if (loading)
    return (
      <section className='h-20'>
        <ContentLoader noMargin />
      </section>
    )

  if (!details) return <></>
  return (
    <section>
      <CategoryDetailMarkdownSection url={getI18nTranslations<string>(details.md, i18n.language, '')} />
    </section>
  )
}

export default CategoryDetailFooter
