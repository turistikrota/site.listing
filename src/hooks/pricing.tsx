import { useTranslation } from "next-i18next"

export const useLocalizedFormatter = () : Intl.NumberFormat => {
    const {i18n} =useTranslation()
    return new Intl.NumberFormat(i18n.language, { style: 'currency', currency: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}