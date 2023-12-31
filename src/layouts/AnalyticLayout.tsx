import { useTranslation } from 'next-i18next'
import Script from 'next/script'
import { FC, PropsWithChildren } from 'react'

const TurkishAnalytics: FC = () => {
  return (
    <>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-2NMFRCYRF2' strategy='afterInteractive'></Script>
      <Script id='google-tag' strategy='afterInteractive'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-2NMFRCYRF2');
      `}
      </Script>
    </>
  )
}

const EnglishAnalytics: FC = () => {
  return (
    <>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-Q7YKQ763VG' strategy='afterInteractive'></Script>
      <Script id='google-tag' strategy='afterInteractive'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-Q7YKQ763VG');
        `}
      </Script>
    </>
  )
}

const AnalyticLayout: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()
  return (
    <>
      {children}
      {i18n.language === 'tr' ? <TurkishAnalytics /> : <EnglishAnalytics />}
    </>
  )
}

export default AnalyticLayout
