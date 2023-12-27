export const getCategoryRoute = (slug: string, locale: string) : string => {
    if(locale === 'tr') return `/kategori/${slug}`
    return `/category/${slug}`
}