import { useTranslation } from "next-i18next"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { CategoryListItem, CategoryMeta, EmptyCategoryMeta, fetchChildCategories, fetchMainCategories } from "~/api/category.api"
import { SelectionItem } from "~/components/selection/RichSelection"
import { getI18nTranslations } from "~/utils/i18n"

export type CategoryState = CategoryListItem & {
    children?: SelectionItem[]
}

type CategorySelectionContext = {
    loading: boolean
    categories: SelectionItem[]
    selectedCategories: SelectionItem[]
    selectedCategoryIds: string[]
    toggleCategory: (category: SelectionItem) => void
}

const CategorySelectionContext = createContext<CategorySelectionContext>({
    loading: false,
    categories: [],
    selectedCategories: [],
    selectedCategoryIds: [],
    toggleCategory: () => {},
})

export const useCategorySelection = () => useContext(CategorySelectionContext)

type ProviderProps = {
    initialSelectedCategories?: string[]
    categories?: string[]
    clear?: () => void
}

const createCategoryMapper = (lang: string) => {
    return (category: CategoryListItem) : SelectionItem => ({
        id: category.uuid,
        image: category.images[0]!.url,
        name: getI18nTranslations<CategoryMeta>(category.meta, lang, EmptyCategoryMeta).name,
    })
}

const findCategory = (categories: SelectionItem[], selecteds: string[]) : SelectionItem[] => {
    const list : SelectionItem[] = []
    const category = categories.find((c) => selecteds.includes(c.id))
    if (category) {
        list.push(category)
        if (category.children) {
            const child = findCategory(category.children, selecteds)
            if (child) {
                list.push(...child)
            }
        }
    }
    return list
}

export const CategorySelectionProvider: React.FC<React.PropsWithChildren<ProviderProps>> = ({ children, initialSelectedCategories = [], categories , clear }) => {
    const [loading, setLoading] = useState(false)
    const { i18n } = useTranslation()
    const mapper = useMemo(() => createCategoryMapper(i18n.language), [i18n.language])
    const [initials, setInitials] = useState<string[]>(initialSelectedCategories)
    const [firstLoad, setFirstLoad] = useState(true)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [allCategories, setAllCategories] = useState<SelectionItem[]>([])

    const selecteds = useMemo<SelectionItem[]>(() => {
        return findCategory(allCategories, selectedCategories)
    }, [allCategories, selectedCategories])

    useEffect(() => {
        fetchMainCategories().then(res => {
            setAllCategories(res.map(mapper))
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if(!Array.isArray(categories)) {
            setSelectedCategories([])
            setAllCategories(allCategories.map(s => ({
                ...s,
                children: undefined
            })))
        }
    }, [categories])

    useEffect(() => {
        if (!firstLoad || !initials || initials.length === 0 || allCategories.length === 0) return
        syncCategories(initials)
        setFirstLoad(false)
    }, [allCategories,initials])

    useEffect(() => {
      if (initialSelectedCategories && initialSelectedCategories.length > 0) {
        setInitials(initialSelectedCategories)
      }
    }, [initialSelectedCategories])

  const syncCategories = async (initialSelectedCategories: string[]) => {
    if (!initialSelectedCategories || initialSelectedCategories.length === 0 || allCategories.length === 0) {
        return
    }
    setLoading(true)
    const promises = initialSelectedCategories.map((c) => fetchChildCategories(c))
    const responses = await Promise.all(promises)
    const findMainCategory = (categories : SelectionItem[], categoryId : string) : SelectionItem | undefined => {
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i]
            if (category.id === categoryId) {
            return category
            }
            if (category.children) {
            const child = findMainCategory(category.children, categoryId)
            if (child) {
                return child
            }
            }
        }
    }
    let anyMainFound = false

    initialSelectedCategories.forEach((c, idx) => {
        const mainCategory = findMainCategory(allCategories, c)
        if (mainCategory) {
            if (responses[idx].length > 0) {
                anyMainFound = true
                mainCategory.children = responses[idx].map(mapper)
            }
        }
    })

    if(!anyMainFound && clear) clear()

    setAllCategories(allCategories)
    setSelectedCategories(initialSelectedCategories)
    setLoading(false)
  }

  const getChildCategories = (parentId: string, parent: SelectionItem) => {
    if(parent.children) return
    setLoading(true)
    fetchChildCategories(parentId).then((res) => {
        parent.children = res.map(mapper)
        setAllCategories(allCategories)
        setLoading(false)
    })
  }

    const toggleCategory = (category: SelectionItem) => {
        if (selectedCategories.includes(category.id)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category.id))
        }else {
            setSelectedCategories([...selectedCategories, category.id])
            getChildCategories(category.id, category)
        }
    }

    return (
        <CategorySelectionContext.Provider
            value={{
                loading,
                categories: allCategories,
                selectedCategories: selecteds,
                selectedCategoryIds: selectedCategories,
                toggleCategory,
            }}
        >
            {children}
        </CategorySelectionContext.Provider>
    )
}