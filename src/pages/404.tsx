import ErrorPage from '@turistikrota/ui/pages/error'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { FC } from 'react'

const NotFoundView: FC = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('notFoundPage.title')} | Turistikrota</title>
      </Head>
      <ErrorPage
        code={404}
        title={t('notFoundPage.title')}
        subtitle={t('notFoundPage.subtitle')}
        button={
          <Link
            href={'/'}
            className='my-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
          >
            {t('notFoundPage.button')}
          </Link>
        }
      />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  }
}

export default NotFoundView
