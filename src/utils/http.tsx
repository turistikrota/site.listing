import axios from 'axios'
import { useTranslation } from 'next-i18next'

export const httpClient = axios.create({
  withCredentials: true,
})

export const useHttp = () => {
    const { i18n } = useTranslation()
    httpClient.defaults.headers.common['Accept-Language'] = i18n.language
    return httpClient
}