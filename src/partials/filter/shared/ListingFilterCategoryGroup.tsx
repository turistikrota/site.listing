import debounce from '@turistikrota/ui/utils/debounce'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import ScrollableSection from '~/components/section/ScrollableSection'
import RichSelection, { SelectionItem } from '~/components/selection/RichSelection'
import { useListingFilter } from '~/contexts/listing.filter'
import { useCategorySelection } from '~/hooks/category'
import { useListingPusher } from '~/hooks/listing-pusher'
import { uniqueArray } from '~/utils/object'

const ListingFilterCategoryGroup: FC = () => {
  const { i18n } = useTranslation('filter')
  const { selectedCategorySlugs, toggleCategory, categories } = useCategorySelection()
  const { query } = useListingFilter()
  const { push } = useListingPusher()

  const debouncedToggleCategory = debounce(toggleCategory, 300)

  const onToggle = (category: SelectionItem) => {
    if (query.filter.categories && query.filter.categories.includes(category.slug)) {
      push({
        ...query,
        filter: {
          ...query.filter,
          categories: uniqueArray(query.filter.categories?.filter((c) => c !== category.slug)),
        },
      })
    } else {
      push({
        ...query,
        filter: {
          ...query.filter,
          categories: uniqueArray([...(query.filter.categories || []), category.slug]),
        },
      })
    }
    debouncedToggleCategory(category)
  }

  return (
    <>
      <div>
        <ScrollableSection>
          <RichSelection items={categories} selectedSlugs={selectedCategorySlugs} onToggle={onToggle} />
        </ScrollableSection>
      </div>
    </>
  )
}

export default ListingFilterCategoryGroup
