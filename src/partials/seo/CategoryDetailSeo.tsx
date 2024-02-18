import Head from 'next/head'
import { CategoryMetaWithSeo } from '~/api/category.api'
import { makeHtmlTitle } from '~/utils/seo'
import BaseSeo from './BaseSeo'

type SeoProps = {
  images: string[]
  meta: CategoryMetaWithSeo
}

const CategoryDetailSeo: React.FC<SeoProps> = ({ meta, images }) => {
  const title = makeHtmlTitle(meta.seo.title)
  return (
    <Head>
      <title>{title}</title>

      <meta name='description' content={meta.seo.description} />
      <meta name='keywords' content={meta.seo.keywords} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={meta.seo.description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={images[0] || ''} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@turistikrota' />
      <meta name='twitter:creator' content='@turistikrota' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={meta.seo.description} />
      <meta name='twitter:image' content={images[0] || ''} />
      <BaseSeo />
    </Head>
  )
}

export default CategoryDetailSeo
