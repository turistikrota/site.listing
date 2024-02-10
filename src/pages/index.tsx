import { ListResponse } from '@turistikrota/ui'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CategoryDetail, fetchCategory } from '~/api/category.api'
import { filterListings } from '~/api/listing.api'
import { PaymentConfig, fetchPaymentConfig } from '~/api/pay.api'
import { Config } from '~/config'
import { ListingFilterProvider } from '~/contexts/listing.filter'
import AnalyticLayout from '~/layouts/AnalyticLayout'
import MapLayout from '~/layouts/MapLayout'
import { LayoutProps } from '~/layouts/layout.types'
import ContentSwitcher from '~/partials/content/ContentSwitcher'
import ListingListSeo from '~/partials/seo/ListingListSeo'
import { isApiError } from '~/types/error'
import { ListingListItem } from '~/types/listing'
import { ListingFilter } from '~/types/listing.filter'
import { PaginationRequest } from '~/types/pagination'
import { getQueryFromSearchParams } from '~/utils/listing.utils'

type Props = LayoutProps & {
  response?: ListResponse<ListingListItem>
  initialQuery?: PaginationRequest<ListingFilter>
  payConfig: PaymentConfig | null
  categoryDetail: CategoryDetail | null
  error?: any
}

export default function Home({ response, categoryDetail, initialQuery, error, payConfig, ...layoutProps }: Props) {
  return (
    <AnalyticLayout>
      <ListingListSeo />
      <MapLayout {...layoutProps}>
        <ListingFilterProvider initialQuery={initialQuery}>
          <ContentSwitcher
            response={response}
            categoryDetail={categoryDetail || undefined}
            payConfig={payConfig || undefined}
            error={error}
          />
        </ListingFilterProvider>
      </MapLayout>
    </AnalyticLayout>
  )
}

type ServerSideResult = {
  props: Props
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<ServerSideResult> {
  const urlSearchParams = new URLSearchParams(ctx.query as any)
  const query = getQueryFromSearchParams(urlSearchParams)
  const lastCategory: string | undefined =
    query.filter.categories && query.filter.categories.length > 0
      ? query.filter.categories[query.filter.categories.length - 1]
      : undefined
  let err: any
  const [res, categoryDetail, payConfig] = await Promise.all([
    filterListings(query.filter, query.page, query.limit),
    lastCategory ? fetchCategory(lastCategory) : Promise.resolve(undefined),
    fetchPaymentConfig(),
  ])
  console.log('------------------------')
  console.log('res', res)
  console.log('categoryDetail', categoryDetail)
  console.log('payConfig', payConfig)
  console.log('------------------------')
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'filter', 'sort', 'listing'])),
      response: res,
      initialQuery: query,
      payConfig: payConfig ? payConfig : null,
      categoryDetail: categoryDetail ? categoryDetail : null,
      error: !!err && isApiError(err) ? err.response.data : null,
      accessTokenIsExists: !!ctx.req.cookies[Config.cookies.accessToken],
      accountCookie: ctx.req.cookies[Config.cookies.accountName] ?? '',
    },
  }
}
