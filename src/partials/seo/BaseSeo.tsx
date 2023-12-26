import { useTranslation } from 'next-i18next'

const BaseSeo: React.FC = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <meta name='application-name' content='Turistikrota' />
      <meta name='generator' content='Turistikrota' />
      <meta name='referrer' content='origin-when-cross-origin' />
      <meta name='author-url' content={t('url')} />
      <meta name='base-url' content={t('url')} />
      <meta name='color-scheme' content='light dark' />
      <meta name='robots' content='index, follow, nocache' />
      <meta name='googlebot' content='index, follow' />

      <link rel='icon' href='/favicon.ico' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='google-play-app' content='app-id=com.turistikrota.app' />
      <link rel='sitemap' type='application/xml' href='/sitemap.xml' />
    </>
  )
}

export default BaseSeo
