import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC } from "react";
import { CategoryListItem, fetchChildCategories, fetchMainCategories } from "~/api/category.api";
import { Config } from "~/config";
import DefaultLayout from "~/layouts/DefaultLayout";
import { LayoutProps } from "~/layouts/layout.types";

export const getServerSideProps : GetServerSideProps = async (ctx) =>{
    const urlSearchParams = new URLSearchParams(ctx.query as any)
    const mainUUID = urlSearchParams.get('main')
    let categories : CategoryListItem[] = []
    if (mainUUID) {
        categories = await fetchChildCategories(mainUUID)
    }else {
        categories = await fetchMainCategories()
    }
    return {
      props: {
        ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'filter', 'sort', 'listing'])),
        accessTokenIsExists: !!ctx.req.cookies[Config.cookies.accessToken],
        accountCookie: ctx.req.cookies[Config.cookies.accountName] ?? '',
      },
    }
  }

const CategoryListView : FC<LayoutProps> = (props) => {
    return <DefaultLayout {...props}>Knk kategoriler</DefaultLayout>
}


export default CategoryListView;