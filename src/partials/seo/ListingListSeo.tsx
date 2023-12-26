import { Coordinates } from '@turistikrota/ui'
import Head from 'next/head'
import { useListSeo } from '~/hooks/seo'
import { makeHtmlTitle } from '~/utils/seo'
import BaseSeo from './BaseSeo'

type SeoProps = {
  coordinates?: Coordinates
}

const ListingListSeo: React.FC<SeoProps> = ({ coordinates }) => {
  const { title, description, keywords } = useListSeo({ coordinates })

  makeHtmlTitle(title)

  return (
    <Head>
      <BaseSeo />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@turistikrota' />
      <meta name='twitter:creator' content='@turistikrota' />
    </Head>
  )
}

export default ListingListSeo
