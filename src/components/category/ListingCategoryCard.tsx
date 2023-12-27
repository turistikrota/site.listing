
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { FC, useMemo } from "react"
import { CategoryListItem, CategoryMeta, EmptyCategoryMeta } from "~/api/category.api"
import { getCategoryRoute } from "~/utils/category"
import { getI18nTranslations } from "~/utils/i18n"
import { mapAndSortImages } from "~/utils/listing.utils"

type Props = CategoryListItem

const ListingCategoryCard : FC<Props> = ({
    meta,
    images
}) => {
    const { t, i18n } = useTranslation('listing')
    const translations = useMemo(() => getI18nTranslations<CategoryMeta>(meta, i18n.language, EmptyCategoryMeta), [meta, i18n.language])
    const imageUrl = useMemo<string>(() => mapAndSortImages(images)[0], [images])
    return         <Link href={getCategoryRoute(translations.slug, i18n.language)} className="col-span-6 md:col-span-3 flex items-center justify-start gap-2 text-ellipsis overflow-hidden bg-second hover:brightness-110 transition-all duraiton-200 p-2 rounded-md">
    <Image src={imageUrl} alt={translations.title} width={32} height={32} className="rounded-md bg-second object-cover w-12 h-12 " />
    <div className="flex flex-col overflow-hidden text-ellipsis">
        <div className="text-base font-bold overflow-hidden text-ellipsis">{translations.title}</div>
        <div className="text-sm">{translations.name}</div>
    </div>
    </Link>
}

export default ListingCategoryCard