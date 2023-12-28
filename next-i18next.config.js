/** @type {import('next-i18next').UserConfig} */
const i18n = {
  defaultLocale: 'tr',
  locales: ['en', 'tr'],
  domains: [
    {
      domain: 'listing.turistikrota.com',
      defaultLocale: 'en',
      http: true,
      locales: ['en'],
    },
    {
      domain: 'ilan.turistikrota.com',
      defaultLocale: 'tr',
      http: true,
      locales: ['tr'],
    },
  ],
  localeDetection: false,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
}

module.exports = { i18n }
