import { FC } from 'react'
import MarkdownContent from '~/components/markdown/MarkdownContent'
import { useMdContent } from '~/hooks/markdown'

type Props = {
  url: string
}

const CategoryDetailMarkdownSection: FC<Props> = ({ url }) => {
  const content = useMdContent(url)

  return <MarkdownContent content={content} />
}

export default CategoryDetailMarkdownSection
