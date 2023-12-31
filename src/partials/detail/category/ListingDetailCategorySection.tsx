import DefaultCard from '@turistikrota/ui/cards/default'
import FormSection from '@turistikrota/ui/form/section'
import ContentLoader from '@turistikrota/ui/loader'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import {
  CategoryFields,
  CategoryListItem,
  EmptyBaseTranslation,
  fetchCategoryFields,
  fetchCategoryListByUUIDs,
} from '~/api/category.api'
import KeyValue from '~/components/KeyValue'
import ListingCategoryCard from '~/components/category/ListingCategoryCard'
import { useCategoryFeatures } from '~/hooks/category.fields'
import { useGetterQuery } from '~/hooks/query.getter'
import { ListingFeature } from '~/types/listing'
import { getI18nTranslations } from '~/utils/i18n'

type Props = {
  categoryUUIDs: string[]
  features: ListingFeature[]
}

const ListingDetailCategorySection: FC<Props> = ({ categoryUUIDs, features }) => {
  const { t, i18n } = useTranslation('listing')
  const { data: fields, loading: fieldLoading } = useGetterQuery<CategoryFields>(() =>
    fetchCategoryFields(categoryUUIDs),
  )
  const { data: categories, loading: categoryLoading } = useGetterQuery<CategoryListItem[]>(() =>
    fetchCategoryListByUUIDs(categoryUUIDs),
  )

  const { filterByGroup, fixValue } = useCategoryFeatures(fields?.inputGroups ?? [], features)

  if (fieldLoading || categoryLoading) return <ContentLoader noMargin />
  if (!fields && !categories) return <></>

  return (
    <>
      <section className='flex flex-col gap-2'>
        <FormSection.Head className='border-transparent !p-0'>
          <FormSection.Head.Title className='text-lg font-semibold'>
            {t('sections.category.title')}
          </FormSection.Head.Title>
          <FormSection.Head.Subtitle>{t('sections.category.subtitle')}</FormSection.Head.Subtitle>
        </FormSection.Head>
        <div className='grid grid-cols-12 gap-2'>
          {categories &&
            categories.map((c, idx) => (
              <ListingCategoryCard key={idx} uuids={categoryUUIDs.slice(0, idx + 1)} {...c} />
            ))}
        </div>
      </section>

      {fields && (
        <>
          {fields.inputGroups.map((group, groupIdx) => (
            <section key={groupIdx}>
              <FormSection.Head.Title className='text-lg font-semibold'>
                {getI18nTranslations(group.translations, i18n.language, EmptyBaseTranslation).name}
              </FormSection.Head.Title>
              <FormSection.Head.Subtitle>
                {getI18nTranslations(group.translations, i18n.language, EmptyBaseTranslation).description}
              </FormSection.Head.Subtitle>
              <section className={'mt-2 grid grid-cols-12 gap-2'}>
                {filterByGroup(group.uuid).map((feature, featureIdx) => (
                  <DefaultCard key={featureIdx} className={'col-span-12 md:col-span-6'}>
                    <KeyValue>
                      <KeyValue.Item label={feature.translation.name} value={fixValue(feature.value, feature.extra)} />
                    </KeyValue>
                  </DefaultCard>
                ))}
              </section>
            </section>
          ))}
        </>
      )}
    </>
  )
}

export default ListingDetailCategorySection
