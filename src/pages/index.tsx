import { ListResponse } from '@turistikrota/ui'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
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
  error?: any
}

export default function Home({ response, error, ...layoutProps }: Props) {
  return (
    <MapLayout {...layoutProps}>
      <ListingFilterProvider>
        <ContentSwitcher response={response} error={error} />
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
  let err: any
  const res = await filterListings(query.filter, query.page, query.limit)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'filter', 'sort', 'listing'])),
      response: res,
      error: !!err && isApiError(err) ? err.response.data : null,
      accessTokenIsExists: !!ctx.req.cookies[Config.cookies.accessToken],
      accountCookie: ctx.req.cookies[Config.cookies.accountName] ?? '',
    },
  }
}
