import { useTranslation } from 'next-i18next'

type Props = {
  onClear?: () => void
  text?: string
}

const ListingFilterClearButton: React.FC<Props> = ({ onClear, text }) => {
  const { t } = useTranslation('common')
  return (
    <span
      className=' text-primary hover:opacity-90 transition-colors'
      onClick={() => onClear && onClear()}
      role='button'
      title={t('ux.button.clear-filter')}
      aria-label={t('ux.button.clear-filter')}
    >
      {text ?? t('ux.button.clear')}
    </span>
  )
}

export default ListingFilterClearButton
