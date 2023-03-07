const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isStatus = process.env.IS_STATUS
const transpileModules = []

// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  // },
  env: {},
  publicRuntimeConfig: {
    isProd,
    isDev,
    isStatus,
    domain: process.env.DOMAIN,
    apiServer: process.env.API_SERVER,
    sinsaSever: process.env.SINSA_SERVER,
    lamdaServer: process.env.LAMBDA_SERVER,
    seokchonServer: process.env.SEOKCHON_SERVER,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
      plugins: [
        ...config.plugins,
        new MergeIntoSingleFilePlugin({
          files: {
            [`static/${buildId}/libs.js`]: ['src/libs/*.js'],
          },
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            DOMAIN: JSON.stringify(process.env.DOMAIN),
            API_SERVER: JSON.stringify(process.env.API_SERVER),
            SINSA_SERVER: JSON.stringify(process.env.SINSA_SERVER),
            LAMBDA_SERVER: JSON.stringify(process.env.LAMBDA_SERVER),
            SEOKCHON_SERVER: JSON.stringify(process.env.SEOKCHON_SERVER),
          },
        }),
      ],
    }
  },
}

module.exports = withTM(transpileModules)(nextConfig)
