import { FC } from "react"

type Props = {
    city: string
    street: string
    className?: string
}

const ListingCardLocationSection: FC<Props> = ({city, street, className}) => {
    return <div className={`col-span-6 flex items-center gap-1 overflow-hidden ${className}`}>
        <div className="text-base font-bold text-ellipsis overflow-hidden">{city}</div>
        <div className="text-sm">/</div>
        <div className="text-sm text-ellipsis overflow-hidden">{street}</div>
    </div>
}

export default ListingCardLocationSection