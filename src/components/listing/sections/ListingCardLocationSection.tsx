import { FC } from "react"

type Props = {
    city: string
    street: string
    className?: string
}

const ListingCardLocationSection: FC<Props> = ({city, street, className}) => {
    return <div className={`col-span-6 flex items-center gap-1 ${className}`}>
        <div className="text-sm font-bold">{city}</div>
        <div className="text-xs">/</div>
        <div className="text-xs">{street}</div>
    </div>
}

export default ListingCardLocationSection