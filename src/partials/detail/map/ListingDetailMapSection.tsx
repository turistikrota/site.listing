"use client"

import { Coordinates } from "@turistikrota/location-tr"
import Alert from "@turistikrota/ui/alert"
import ContentLoader from "@turistikrota/ui/loader"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import { FC, useEffect, useState } from "react"
import { PlaceListItem, fetchNearestPlaces } from "~/api/place.api"

const ListingDetailPlaceMapSection = dynamic(() => import('~/partials/detail/map/ListingDetailPlaceMapSection'), {
    ssr: false,
})

type Props = {
    coordinates: Coordinates
    isStrict: boolean
}

const ListingDetailMapSection : FC<Props> = ({
    coordinates,
    isStrict
}) => {
    const { t } = useTranslation('listing')
    const [loading, setLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [places, setPlaces] = useState<PlaceListItem[]>([])

    useEffect(() => {
        fetchNearestPlaces(coordinates).then(res => {
            setPlaces(res)
            setIsError(false)
        }).catch(() => {
            setIsError(true)
        }).finally(() =>{
            setLoading(false)
        })
    }, [coordinates])


    return <section className="flex flex-col gap-2">
        <div>
        <h2 className='text-xl font-semibold'>{t('sections.map.title')}</h2>
        <p>{t('sections.map.subtitle')}</p>
        </div>
        {loading && <div className="h-144 md:h-164">
            <ContentLoader noMargin />
        </div>}
        {!loading && isError && <div className="pt-4 pb-2">
                <Alert showIcon type="error">
                    <Alert.Title>{t('sections.map.error.title')}</Alert.Title>
                    <Alert.Description>
                    {t('sections.map.error.description')}
                    </Alert.Description>
                </Alert>
            </div>}
        {!loading && !isError &&  <ListingDetailPlaceMapSection isStrict={isStrict} listingCoordinates={coordinates} position={coordinates} data={places} />}
    </section>
}

export default ListingDetailMapSection