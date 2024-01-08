import { Coordinates } from '@turistikrota/ui/types'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useMemo } from 'react'
import { ListingMeta } from '~/types/listing'
import { makeHtmlTitle } from '~/utils/seo'
import BaseSeo from './BaseSeo'

type SeoProps = {
  images: string[]
  coordinates: Coordinates
  meta: ListingMeta
  isStrict?: boolean
}

const ListingDetailSeo: React.FC<SeoProps> = ({ meta, images, coordinates, isStrict }) => {
  const { t } = useTranslation('listing')
  const title = makeHtmlTitle(meta.title)

  const keywords = useMemo<string>(() => {
    const words = meta.description.split(' ').slice(0, 5)
    return t('seo.keywords') + ' ' + words.join(', ')
  }, [meta])
  return (
    <Head>
      <title>{title}</title>

      <meta name='description' content={meta.description} />
      <meta name='keywords' content={keywords} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={images[0] || ''} />
      {isStrict && (
        <>
          <meta property='place:location:latitude' content={coordinates[0].toString()} />
          <meta property='place:location:longitude' content={coordinates[1].toString()} />
        </>
      )}

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@turistikrota' />
      <meta name='twitter:creator' content='@turistikrota' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={images[0] || ''} />
      <BaseSeo />
    </Head>
  )
}

export default ListingDetailSeo
