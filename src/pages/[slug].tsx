import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import ImagePreviewProvider from '@turistikrota/ui/image/preview'
import ErrorPage from '@turistikrota/ui/pages/error'
import StickySection from '@turistikrota/ui/section/sticky'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { fetchListingDetails } from '~/api/listing.api'
import { PaymentConfig, fetchPaymentConfig } from '~/api/pay.api'
import ListingImagePreviewCard from '~/components/listing/ListingImagePreviewCard'
import { Config } from '~/config'
import { PayConfigProvider } from '~/contexts/pay.config'
import AnalyticLayout from '~/layouts/AnalyticLayout'
import DefaultLayout from '~/layouts/DefaultLayout'
import { LayoutProps } from '~/layouts/layout.types'
import ListingDetailBasicInfoSection from '~/partials/detail/ListingDetailBasicInfoSection'
import ListingDetailBusinessSection from '~/partials/detail/ListingDetailBusinessSection'
import ListingDetailCalendarSection from '~/partials/detail/calendar/ListingDetailCalendarSection'
import ListingDetailCategorySection from '~/partials/detail/category/ListingDetailCategorySection'
import ListingDetailMapSection from '~/partials/detail/map/ListingDetailMapSection'
import ListingDetailReservationButton from '~/partials/detail/reservation/ListingDetailReservationButton'
import ListingDetailReservationSection from '~/partials/detail/reservation/ListingDetailReservationSection'
import ListingDetailValidationSection from '~/partials/detail/validation/ListingDetailValidationSection'
import ListingDetailSeo from '~/partials/seo/ListingDetailSeo'
import { EmptyListingMeta, ListingDetail, ListingMeta } from '~/types/listing'
import { getI18nTranslations } from '~/utils/i18n'
import { mapAndSortImages } from '~/utils/listing.utils'
import { makeHtmlTitle, renderHtmlTitle } from '~/utils/seo'

type Props = LayoutProps & {
  response: ListingDetail | null
  payConfig: PaymentConfig | null
  startDate: string | null
  endDate: string | null
  adultQuery: string | null
  kidQuery: string | null
  babyQuery: string | null
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const slug = ctx.query.slug
  if (!slug || typeof slug !== 'string')
    return {
      notFound: true,
    }
  const locale = ctx.locale || 'tr'
  const [details, payConfig] = await Promise.all([fetchListingDetails(slug, locale), fetchPaymentConfig()])
  if (details.status === 404) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'tr', ['common', 'listing', 'place', 'filter'])),
      response: details.data ? details.data : null,
      payConfig: payConfig ? payConfig : null,
      accessTokenIsExists: !!ctx.req.cookies[Config.cookies.accessToken],
      accountCookie: ctx.req.cookies[Config.cookies.accountName] ?? '',
      startDate: typeof ctx.query?.start === 'string' ? ctx.query.start : null,
      endDate: typeof ctx.query?.end === 'string' ? ctx.query.end : null,
      adultQuery: typeof ctx.query?.adult === 'string' ? ctx.query.adult : null,
      kidQuery: typeof ctx.query?.kid === 'string' ? ctx.query.kid : null,
      babyQuery: typeof ctx.query?.baby === 'string' ? ctx.query.baby : null,
    },
  }
}

const ListingDetailView: FC<Props> = ({
  response,
  startDate,
  endDate,
  adultQuery,
  kidQuery,
  babyQuery,
  ...layoutProps
}) => {
  const { t, i18n } = useTranslation('listing')
  const images = useMemo(() => (response ? mapAndSortImages(response.images) : []), [response])
  const isDesktop = useIsDesktop()
  const translations = useMemo(
    () =>
      response ? getI18nTranslations<ListingMeta>(response.meta, i18n.language, EmptyListingMeta) : EmptyListingMeta,
    [response, i18n.language],
  )
  if (response === null) {
    renderHtmlTitle(makeHtmlTitle(t('anError.title')))
    return (
      <ErrorPage
        code={500}
        title={t('anError.title')}
        subtitle={t('anError.subtitle')}
        button={
          <Link
            href={'/'}
            className='my-2 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
          >
            {t('notFound.backHome')}
          </Link>
        }
      />
    )
  }
  return (
    <AnalyticLayout>
      <ListingDetailSeo
        meta={translations}
        coordinates={response.location.coordinates}
        images={images}
        isStrict={response.location.isStrict}
      />
      <DefaultLayout {...layoutProps}>
        <PayConfigProvider>
          <ImagePreviewProvider altPrefix={translations.title} list={images}>
            <section className='mx-auto grid max-w-7xl grow grid-cols-12 p-2 lg:flex lg:h-full xl:px-0'>
              <div className='col-span-12 flex w-full flex-col gap-4'>
                <ListingImagePreviewCard images={images} title={translations.title} />
                {!isDesktop && (
                  <ListingDetailReservationButton
                    validation={response.validation}
                    uuid={response.uuid}
                    prices={response.prices}
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    adultQuery={adultQuery || undefined}
                    kidQuery={kidQuery || undefined}
                    babyQuery={babyQuery || undefined}
                  />
                )}
                <ListingDetailBasicInfoSection title={translations.title} description={translations.description} />
                <ListingDetailBusinessSection nickName={response.business.nickName} />
                <hr />
                <ListingDetailCategorySection categoryUUIDs={response.categoryUUIDs} features={response.features} />
                <ListingDetailValidationSection validation={response.validation} />
                <ListingDetailCalendarSection prices={response.prices} />
                <ListingDetailMapSection
                  coordinates={response.location.coordinates}
                  isStrict={response.location.isStrict}
                />
              </div>
              {isDesktop && (
                <StickySection customWidth='w-128 xl:x-144' innerClassName='px-2'>
                  <ListingDetailReservationSection
                    validation={response.validation}
                    uuid={response.uuid}
                    prices={response.prices}
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    adultQuery={adultQuery || undefined}
                    kidQuery={kidQuery || undefined}
                    babyQuery={babyQuery || undefined}
                  />
                </StickySection>
              )}
            </section>
          </ImagePreviewProvider>
        </PayConfigProvider>
      </DefaultLayout>
    </AnalyticLayout>
  )
}

export default ListingDetailView
