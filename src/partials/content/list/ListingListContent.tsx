import { ListResponse } from "@turistikrota/ui"
import { FC } from "react"
import { ListingListItem } from "~/types/listing"

type Props = {
    isNext: boolean
    loading: boolean
    data: ListResponse<ListingListItem> | null
    onNextPage?: () => void
}

type ItemProps = {
    isFiltered: boolean
    onClear: () => void
}

const ListItemSection : FC<ItemProps> = () => {
    return <></>
}

const ListingListContent : FC<Props> = () => {
    return <></>
}

export default ListingListContent