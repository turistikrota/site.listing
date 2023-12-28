import { useEffect, useState } from 'react'
import { TimeSpent } from '~/api/place.api'

export const useTimeSpentUnit = (data: TimeSpent): string => {
  const [unit, setUnit] = useState('card.minute')

  useEffect(() => {
    if (data.min === data.max) {
      safeSet('card.minute')
    } else if (data.max > 60) {
      safeSet('card.hour')
    } else {
      safeSet('card.minute')
    }
  }, [data])

  const safeSet = (key: string) => {
    if (unit !== key) setUnit(key)
  }

  return unit
}

export const useTimeSpent = (data: TimeSpent): TimeSpent => {
  if (data.max > 60) {
    const min = Math.round(data.min / 60)
    const max = Math.round(data.max / 60)
    if (min === max) {
      const minRemain = data.min % 60
      const maxRemain = data.max % 60
      return {
        min: min - 1 + minRemain / 60,
        max: max + maxRemain / 60,
      }
    }
    return {
      min,
      max,
    }
  }
  return data
}