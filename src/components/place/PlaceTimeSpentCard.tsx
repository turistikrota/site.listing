import { useTranslation } from 'next-i18next'
import { TimeSpent } from '~/api/place.api'
import { useTimeSpent, useTimeSpentUnit } from '~/hooks/timespent'

type Props = {
  data: TimeSpent
}

const TimeSpentCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation('place')
  const unit = useTimeSpentUnit(data)
  const spent = useTimeSpent(data)

  return (
    <div className='text-gray-500 dark:text-gray-300' suppressHydrationWarning>
      {t('card.time-spent', {
        min: spent.min,
        max: spent.max,
        unit: t(unit),
      })}
    </div>
  )
}

export default TimeSpentCard