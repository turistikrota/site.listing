import CubeEffect from '@turistikrota/ui/design/cube'
import GlassEffect from '@turistikrota/ui/design/glass'
import { useTranslation } from 'next-i18next'
import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import type { FC } from 'react'

const TurkishAnalytics: FC = () => {
  return (
    <>
      <Script
        async={true}
        src='https://www.googletagmanager.com/gtag/js?id=G-2NMFRCYRF2'
        strategy='afterInteractive'
      ></Script>
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
      <Script
        async={true}
        src='https://www.googletagmanager.com/gtag/js?id=G-Q7YKQ763VG'
        strategy='afterInteractive'
      ></Script>
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

export default function Document() {
  const { i18n } = useTranslation()
  return (
    <Html lang={i18n.language}>
      <Head />
      <body>
        <GlassEffect.Fixed />
        <CubeEffect.All />
        <Main />
        <NextScript />
        {i18n.language === 'tr' ? <TurkishAnalytics /> : <EnglishAnalytics />}
      </body>
    </Html>
  )
}
