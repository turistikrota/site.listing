import { I18nTranslation } from '@turistikrota/ui/types'
import { Services, apiUrl } from '~/config/services'
import { httpClient } from '~/utils/http'

export type CategoryInput = {
  uuid: string
  groupUUID: string
  type: string
  translations: I18nTranslation<InputTranslation>
  isRequired: boolean
  isMultiple: boolean
  isUnique: boolean
  isPayed: boolean
  extra: InputExtra[]
  options: string[]
}

export type InputExtra = {
  name: string
  value: string
}

export type InputTranslation = {
  name: string
  placeholder: string
  help: string
}

export type BaseTranslation = {
  name: string
  description: string
}

export type InputGroup = {
  uuid: string
  icon: string
  translations: I18nTranslation<BaseTranslation>
  inputs: CategoryInput[]
}

export type CategoryMiniMeta = {
  name: string
  slug: string
}

export type CategoryRule = {
  uuid: string
  categoryMeta: I18nTranslation<CategoryMiniMeta>
  translations: I18nTranslation<BaseTranslation>
}

export type CategoryAlert = {
  uuid: string
  categoryMeta: I18nTranslation<CategoryMiniMeta>
  translations: I18nTranslation<BaseTranslation>
  type: 'info' | 'warning' | 'error'
}

export type CategoryFields = {
  inputGroups: InputGroup[]
  alerts: CategoryAlert[]
  rules: CategoryRule[]
}

type Image = {
  url: string
  order: number
}

export type CategoryMeta = {
  name: string
  slug: string
  description: string
  title: string
}

export type CategoryDetail = {
  uuid: string
  mainUUIDs: any[]
  images: Image[]
  meta: I18nTranslation<CategoryMetaWithSeo>
  createdAt: string
  md: I18nTranslation<string>
}

export type CategoryMetaWithSeo = CategoryMeta & {
  seo: CategorySeo
}

export type CategorySeoExtra = {
  name: string
  content: string
  attributes: CategorySeoAttribute[]
}

export type CategorySeoAttribute = {
  name: string
  value: string
}

export type CategorySeo = {
  title: string
  description: string
  keywords: string
  canonical: string
}

export const EmptyCategoryMeta: CategoryMeta = {
  name: '',
  slug: '',
  description: '',
  title: '',
}

export const EmptyInputTranslation: InputTranslation = {
  help: '',
  name: '',
  placeholder: '',
}

export const EmptyBaseTranslation: BaseTranslation = {
  description: '',
  name: '',
}

export const EmptyCategoryMetaWithSeo: CategoryMetaWithSeo = {
  ...EmptyCategoryMeta,
  seo: {
    canonical: '',
    description: '',
    keywords: '',
    title: '',
  },
}

export type CategoryListItem = {
  uuid: string
  mainUUIDs: string[]
  images: Image[]
  meta: I18nTranslation<CategoryMeta>
}

export const fetchCategoryFields = async (uuids: string[]): Promise<CategoryFields> => {
  const res = await httpClient.get(apiUrl(Services.Category, `/fields?uuids=${uuids.join(',')}`)).catch(() => ({
    data: {
      inputGroups: [],
      alerts: [],
      rules: [],
    },
  }))
  return res.data
}

export const fetchCategory = async (uuid: string): Promise<CategoryDetail | undefined> => {
  const res = await httpClient.get(apiUrl(Services.Category, `/${uuid}`)).catch(() => ({
    data: {
      inputGroups: [],
      alerts: [],
      rules: [],
    },
  }))
  return res.data
}

export const fetchMainCategories = async (): Promise<CategoryListItem[]> => {
  const res = await httpClient.get(apiUrl(Services.Category, '/')).catch(() => ({
    data: [],
  }))
  return res.data
}

export const fetchChildCategories = async (uuid: string): Promise<CategoryListItem[]> => {
  const res = await httpClient.get(apiUrl(Services.Category, `/${uuid}/child`)).catch(() => ({
    data: [],
  }))
  return res.data
}

export const fetchCategoryListByUUIDs = async (uuids: string[]): Promise<CategoryListItem[]> => {
  const res = await httpClient.get(apiUrl(Services.Category, `/?uuids=${uuids.join(',')}`)).catch(() => ({
    data: [],
  }))
  return res.data
}
