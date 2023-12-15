import '@turistikrota/ui/assets/config.css'
import '@turistikrota/ui/assets/default.css'
import type { AppProps } from 'next/app'
import '~/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
