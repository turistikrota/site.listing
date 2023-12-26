import { getStaticRoute } from '~/static/page'

export const getRedirectUrl = (lang: string, url: string) => {
  return getStaticRoute(lang).auth.default + '?redirect=' + url
}

export const getAccountRedirectUrl = (lang: string, url: string) => {
  return getStaticRoute(lang).account.select + '?redirect=' + url
}

export const openLoginWithRedirect = (lang: string, url: string) => {
  window.open(getRedirectUrl(lang, url), '_self')
}

export const openLogin = (lang: string) => {
  window.open(getStaticRoute(lang).auth.default, '_self')
}
