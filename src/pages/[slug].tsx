import { useIsDesktop } from "@turistikrota/ui/hooks/dom";
import ImagePreviewProvider from "@turistikrota/ui/image/preview";
import ErrorPage from "@turistikrota/ui/pages/error";
import StickySection from "@turistikrota/ui/section/sticky";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { FC, useMemo } from "react";
import ListingImagePreviewCard from "~/components/listing/ListingImagePreviewCard";
import { Config } from "~/config";
import { Services, apiUrl } from "~/config/services";
import DefaultLayout from "~/layouts/DefaultLayout";
import { LayoutProps } from "~/layouts/layout.types";
import ListingDetailBasicInfoSection from "~/partials/detail/ListingDetailBasicInfoSection";
import ListingDetailBusinessSection from "~/partials/detail/ListingDetailBusinessSection";
import ListingDetailCalendarSection from "~/partials/detail/calendar/ListingDetailCalendarSection";
import ListingDetailCategorySection from "~/partials/detail/category/ListingDetailCategorySection";
import ListingDetailMapSection from "~/partials/detail/map/ListingDetailMapSection";
import ListingDetailReservationButton from "~/partials/detail/reservation/ListingDetailReservationButton";
import ListingDetailReservationSection from "~/partials/detail/reservation/ListingDetailReservationSection";
import ListingDetailValidationSection from "~/partials/detail/validation/ListingDetailValidationSection";
import { EmptyListingMeta, ListingDetail, ListingMeta } from "~/types/listing";
import { httpClient } from "~/utils/http";
import { getI18nTranslations } from "~/utils/i18n";
import { mapAndSortImages } from "~/utils/listing.utils";
import { makeHtmlTitle, renderHtmlTitle } from "~/utils/seo";

type Props = LayoutProps & {
    response: ListingDetail | null
}

export const getServerSideProps : GetServerSideProps<Props> = async(ctx) => {
    const slug = ctx.query.slug
    if (!slug) return {
        notFound: true
    }
    const locale = ctx.locale || 'tr'
    const res = await httpClient.get(apiUrl(Services.Listing, `/${slug}`), {
        headers: {
          'Accept-Language': locale,
        }
      }).catch((err => {
        return { data: undefined, status: 500 }
      }))
    if (res.status === 404) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'filter', 'sort', 'listing'])),
            response: res.data ? res.data : null,
            accessTokenIsExists: !!ctx.req.cookies[Config.cookies.accessToken],
            accountCookie: ctx.req.cookies[Config.cookies.accountName] ?? '',
        }
    }
}

const ListingDetailView : FC<Props> = ({response, ...layoutProps}) => {
    const { t, i18n } = useTranslation('listing')
    const images = useMemo(() => response ? mapAndSortImages(response.images) : [], [response])
    const isDesktop = useIsDesktop()
    const translations = useMemo(() => response ? getI18nTranslations<ListingMeta>(response.meta, i18n.language, EmptyListingMeta) : EmptyListingMeta, [response, i18n.language])
    if (response === null) {
        renderHtmlTitle(makeHtmlTitle(t('anError.title')))
        return <ErrorPage code={500} title={t('anError.title')} subtitle={t('anError.subtitle')} 
        button={
          <Link
            href={'/'}
            className='inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-2'
          >
            {t('notFound.backHome')}
          </Link>
        } />
    }
    return <DefaultLayout {...layoutProps}>
        <ImagePreviewProvider altPrefix={translations.title} list={images}>
            <section className="max-w-7xl p-2 xl:px-0 mx-auto lg:h-full lg:flex grow grid grid-cols-12">
                <div className="col-span-12 w-full flex flex-col gap-4">
                    <ListingImagePreviewCard images={images} title={translations.title} />
                    {!isDesktop && <ListingDetailReservationButton />}
                    <ListingDetailBasicInfoSection title={translations.title} description={translations.description} />
                    <ListingDetailBusinessSection nickName={response.business.nickName} />
                    <hr />
                    <ListingDetailCategorySection categoryUUIDs={response.categoryUUIDs} features={response.features} />
                    <ListingDetailValidationSection />
                    <ListingDetailCalendarSection />
                    <ListingDetailMapSection />
                </div>
                {isDesktop && <StickySection customWidth="w-128 xl:x-144" innerClassName="px-2">
                        <ListingDetailReservationSection />
                    </StickySection>}
            </section>
        </ImagePreviewProvider>
    </DefaultLayout>
}

export default ListingDetailView;