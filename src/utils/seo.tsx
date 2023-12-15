export const makeHtmlTitle = (title: string) => `${title} | Turistikrota`

export const renderHtmlTitle = (title: string) => {
  if (typeof window === 'undefined') return
  document.title = title
}
