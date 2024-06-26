import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { Type } from '~/api/place.api'
import { PlaceTypeItems, PlaceTypes } from '~/types/place'

type Props = {
  type: Type
}

const PlaceTypeCard: FC<Props> = ({ type }) => {
  const { t } = useTranslation('place')
  const current: PlaceTypeItems = PlaceTypes[type] ? PlaceTypes[type] : PlaceTypes[Type.Other]

  return (
    <div className={`flex items-center gap-1 rounded-md px-2 py-1 ${current.color}`}>
      <i className={`${current.icon}`}></i>
      <div className={`text-sm`} suppressHydrationWarning>
        {t(current.text)}
      </div>
    </div>
  )
}

export default PlaceTypeCard
