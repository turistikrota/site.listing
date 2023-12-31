import { useState } from 'react'

type Result = {
  visible: boolean
}

export const useCategoryDetail = (): Result => {
  const [visible, setVisible] = useState(false)

  return {
    visible,
  }
}
