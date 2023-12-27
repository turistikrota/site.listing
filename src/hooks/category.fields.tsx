import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'
import { EmptyInputTranslation, InputExtra, InputGroup, InputTranslation } from '~/api/category.api'
import { ListingFeature } from '~/types/listing'
import { getI18nTranslations } from '~/utils/i18n'

type MappedFeature<T = any> = {
  categoryInputUUID: string
  inputGroupUUID: string
  value: T
  type: string
  translation: InputTranslation
  options: string[]
  extra: InputExtra[]
}

type Result = {
  list: MappedFeature[]
  filterByGroup: (groupUUID: string) => MappedFeature[]
  fixValue: (value: any, extra: InputExtra[]) => string
}

export const useCategoryFeatures = (inputGroups: InputGroup[], features: ListingFeature[]): Result => {
  const { t, i18n } = useTranslation('listing')
  const list = useMemo<MappedFeature[]>(() => {
    const result: MappedFeature[] = features.map<MappedFeature>((f) => ({
      categoryInputUUID: f.categoryInputUUID,
      inputGroupUUID: '',
      value: f.value,
      type: '',
      translation: {
        name: '',
        help: '',
        placeholder: '',
      },
      options: [],
      extra: [],
    }))
    inputGroups.forEach((g) => {
      g.inputs.forEach((i) => {
        const feature = result.find((f) => f.categoryInputUUID === i.uuid)
        if (feature) {
          feature.inputGroupUUID = g.uuid
          feature.type = i.type
          feature.translation = getI18nTranslations<InputTranslation>(i.translations, i18n.language, EmptyInputTranslation)
          feature.options = i.options
          feature.extra = i.extra
        }
      })
    })
    return result
  }, [inputGroups, features])

  const filterByGroup = useCallback(
    (groupUUID: string) => {
      return list.filter((f) => f.inputGroupUUID === groupUUID)
    },
    [list],
  )

  const fixValue = (value: any, extra: InputExtra[]): string => {
    if (extra.find((e) => e.name === 'translate')?.value == '1') {
      if (Array.isArray(value)) return value.map((v) => t(`category-features.${v}`)).join(', ')
      return t(`category-features.${value}`)
    }
    return value
  }

  return { list, filterByGroup, fixValue }
}