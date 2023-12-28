import { useIsDesktop, useWindowWidth } from '@turistikrota/ui/hooks/dom'
import { FC, useEffect, useState } from 'react'
import { useListingFilter } from '~/contexts/listing.filter'
import { CategorySelectionProvider } from '~/hooks/category'
import { useListingPusher } from '~/hooks/listing-pusher'
import ListingDesktopFilterSection from '~/partials/filter/desktop/ListingDesktopFilterSection'
import ListingMobileFilterSection from '~/partials/filter/mobile/ListingMobileFilterSection'
import { deepMerge } from '~/utils/deepMerge'
import { ContentProps } from '../ContentSwitcher'

const ListFilterAside: FC<ContentProps> = (props) => {
  const isWidthExist = useWindowWidth()
  const isDesktop = useIsDesktop()
  const { push } = useListingPusher()
  const { query } = useListingFilter()
  const [initialCategories, setInitialCategories] = useState<string[] | undefined>(undefined)

  useEffect(() => {
    if (initialCategories !== undefined) return
    if (!query.filter.categories) return
    setInitialCategories(query.filter.categories)
  }, [query.filter.categories])

  const clearCategories = () => {
    push(deepMerge(query, { filter: { categories: undefined } }))
  }

  if (!isWidthExist) return <></>

  return (
    <CategorySelectionProvider
      categories={query.filter.categories}
      initialSelectedCategories={initialCategories}
      clear={clearCategories}
    >
      {isDesktop && <ListingDesktopFilterSection {...props} />}
      {!isDesktop && <ListingMobileFilterSection {...props} />}
    </CategorySelectionProvider>
  )
}

export default ListFilterAside
