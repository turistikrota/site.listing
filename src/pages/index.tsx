import { ListResponse } from '@turistikrota/ui'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { CategoryDetail, fetchCategory } from '~/api/category.api'
import { filterListings } from '~/api/listing.api'
import { Config } from '~/config'
import { ListingFilterProvider } from '~/contexts/listing.filter'
import MapLayout from '~/layouts/MapLayout'
import { LayoutProps } from '~/layouts/layout.types'
import ContentSwitcher from '~/partials/content/ContentSwitcher'
import { isApiError } from '~/types/error'
import { ListingListItem } from '~/types/listing'
import { getQueryFromSearchParams } from '~/utils/listing.utils'

type Props = LayoutProps & {
  response?: ListResponse<ListingListItem>
  categoryDetail: CategoryDetail | null
  error?: any
}

export default function Home({ response, categoryDetail, error, ...layoutProps }: Props) {
  return (
    <MapLayout {...layoutProps}>
      <ListingFilterProvider>
        <ContentSwitcher response={response} categoryDetail={categoryDetail || undefined} error={error} />
      </ListingFilterProvider>
    </MapLayout>
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
  const [res, categoryDetail] = await Promise.all([
    filterListings(query.filter, query.page, query.limit),
    lastCategory ? fetchCategory(lastCategory) : Promise.resolve(undefined),
  ])
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'filter', 'sort', 'listing'])),
      response: res,
      categoryDetail: categoryDetail ? categoryDetail : null,
      error: !!err && isApiError(err) ? err.response.data : null,
      accessTokenIsExists: !!ctx.req.cookies[Config.cookies.accessToken],
      accountCookie: ctx.req.cookies[Config.cookies.accountName] ?? '',
    },
  }
}
