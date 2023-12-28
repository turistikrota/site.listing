import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Type } from "~/api/place.api"
import { PlaceTypeItems, PlaceTypes } from "~/types/place"

type Props = {
    type: Type
}

const PlaceTypeCard : FC<Props> = ({type}) => {
    const { t } = useTranslation('place')
    const current: PlaceTypeItems = PlaceTypes[type] ? PlaceTypes[type] : PlaceTypes[Type.Other]
  
    return (
      <div className={`flex gap-1 px-2 py-1 rounded-md items-center ${current.color}`}>
        <i className={`${current.icon}`}></i>
        <div className={`text-sm`} suppressHydrationWarning>
          {t(current.text)}
        </div>
      </div>
    )
}

export default PlaceTypeCard