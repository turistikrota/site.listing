import { getMdContent } from '@turistikrota/ui/utils/md'
import { useEffect, useState } from 'react'

export const useMdContent = (url: string): string => {
  const [content, setContent] = useState('')

  useEffect(() => {
    getMdContent(url).then(setContent)
  }, [url])

  return content
}
