import { FC } from "react"

type Props = {
    title: string
    description: string
}

const ListingDetailBasicInfoSection : FC<Props> = ({
    title,
    description
}) => {
    return <section  className='flex flex-col gap-2'>
    <h1 className='text-2xl font-bold'>{title}</h1>
    <div className='text-sm'>{description}</div>

    </section>
}

export default ListingDetailBasicInfoSection