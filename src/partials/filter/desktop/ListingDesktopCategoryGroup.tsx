import { useTranslation } from "next-i18next";
import { FC, useEffect, useState } from "react";
import { useListingFilter } from "~/contexts/listing.filter";
import { CategorySelectionProvider } from "~/hooks/category";
import { useListingPusher } from "~/hooks/listing-pusher";
import { deepMerge } from "~/utils/deepMerge";
import ListingFilterCategoryGroup from "../shared/ListingFilterCategoryGroup";
import ListingDesktopFilterContainer from "./ListingDesktopFilterContainer";
import ListingDesktopHead from "./ListingDesktopHead";

const ListingDesktopCategoryGroup : FC = () => {
    const { t } = useTranslation('filter')
    const [initialCategories, setInitialCategories] = useState<string[] | undefined>(undefined)
    const { query} = useListingFilter()
    const { push } = useListingPusher()

    useEffect(() => {
        if(!query.filter.categories) return
        setInitialCategories(query.filter.categories)
    }, [])

    const clearCategories = () => {
      push(deepMerge(query, { filter: { categories: undefined } }))
    }

    return <ListingDesktopFilterContainer>
    <ListingDesktopHead>
<ListingDesktopHead.Title>
{t('components.category.text')}
</ListingDesktopHead.Title>
{!!query.filter.categories && <ListingDesktopHead.Clear onClear={clearCategories} />}
</ListingDesktopHead>
<CategorySelectionProvider initialSelectedCategories={initialCategories} clear={clearCategories}>
    <ListingFilterCategoryGroup />
</CategorySelectionProvider>
</ListingDesktopFilterContainer>
}

export default ListingDesktopCategoryGroup