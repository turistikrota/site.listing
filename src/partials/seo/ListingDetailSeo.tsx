import { Coordinates } from '@turistikrota/ui/types'
import Head from 'next/head'
import { makeHtmlTitle } from '~/utils/seo'
import BaseSeo from './BaseSeo'

type SeoProps = {
  images: string[]
  coordinates: Coordinates
  seoData: any
}

const ListingDetailSeo: React.FC<SeoProps> = ({ seoData, images, coordinates }) => {
  const title = makeHtmlTitle(seoData.seo.title)
  return (
    <Head>
      <title>{title}</title>

      <meta name='description' content={seoData.seo.description} />
      <meta name='keywords' content={seoData.seo.keywords} />

      <meta property='og:title' content={seoData.seo.title} />
      <meta property='og:description' content={seoData.seo.description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={images[0] || ''} />
      <meta property='place:location:latitude' content={coordinates[0].toString()} />
      <meta property='place:location:longitude' content={coordinates[1].toString()} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@turistikrota' />
      <meta name='twitter:creator' content='@turistikrota' />
      <meta name='twitter:title' content={seoData.seo.title} />
      <meta name='twitter:description' content={seoData.seo.description} />
      <meta name='twitter:image' content={images[0] || ''} />
      <BaseSeo />
    </Head>
  )
}

export default ListingDetailSeo
