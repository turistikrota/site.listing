const { i18n } = require('./next-i18next.config.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  transpilePackages: ['@turistikrota/ui', '@turistikrota/location-tr'],
  images: {
    domains: ['s3.turistikrota.com', 'avatar.turistikrota.com'],
  },
  i18n: i18n,
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig
