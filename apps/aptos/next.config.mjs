import bundleAnalyzer from '@next/bundle-analyzer'
import { withAxiom } from 'next-axiom'

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import { withWebSecurityHeaders } from '@kazamaswap/next-config/withWebSecurityHeaders'

const withVanillaExtract = createVanillaExtractPlugin()
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [
    '@kazamaswap/localization',
    '@kazamaswap/hooks',
    '@kazamaswap/utils',
    '@kazamaswap/tokens',
    '@kazamaswap/farms',
    '@kazamaswap/widgets-internal',
  ],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swap',
        permanent: false,
      },
    ]
  },
}

export default withBundleAnalyzer(withVanillaExtract(withAxiom(withWebSecurityHeaders(nextConfig))))
