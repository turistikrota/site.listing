import '@turistikrota/fonts/verdana.css'
import '@turistikrota/ui/assets/config.css'
import '@turistikrota/ui/assets/default.css'
import 'boxicons/css/boxicons.min.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import '~/styles/globals.css'
import '~/styles/leaflet.css'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)
