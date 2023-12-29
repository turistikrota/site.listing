import Input from "@turistikrota/ui/form/input"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { ListingValidation } from "~/types/listing"

type Props = {
    validation: ListingValidation
    adult: number
    kid: number
    baby: number
    onAdultChange: (value: number) => void
    onKidChange: (value: number) => void
    onBabyChange: (value: number) => void
}

const ListingDetailPeopleInput: FC<Props> = ({
    validation, adult, kid, baby, onAdultChange, onKidChange, onBabyChange
}) => {
    const { t } = useTranslation('filter')

    return <>
        <Input 
        label={t('components.people.adult.label')} 
        name={'adult'} 
        type='number' 
        value={adult} 
        min={validation.minAdult}
        max={validation.maxAdult}
        onChange={e => {
            const val = +e.target.value
            onAdultChange(Number.isNaN(val) ? 0 : val)
        }} />
        <div className="flex justify-between gap-2">
        <Input 
        label={t('components.people.kid.label')} 
        name={'kid'} 
        type='number' 
        value={kid} 
        min={validation.minKid}
        max={validation.maxKid}
        onChange={e => {
            const val = +e.target.value
            onKidChange(Number.isNaN(val) ? 0 : val)
        }} />
        <Input 
        label={t('components.people.baby.label')} 
        name={'baby'} 
        type='number' 
        value={baby} 
        min={validation.minBaby}
        max={validation.maxBaby}
        onChange={e => {
            const val = +e.target.value
            onBabyChange(Number.isNaN(val) ? 0 : val)
        }} />
        </div>
    </>
}

export default ListingDetailPeopleInput