import getConfig from 'next/config'

export const {
  publicRuntimeConfig: {
    isProd,
    isDev,
    domain,
    apiServer,
    sinsaServer,
    lamdaServer,
    seokchonServer,
  },
} = getConfig()

export default {
  isProd,
  isDev,
  domain,
  apiServer,
  sinsaServer,
  lamdaServer,
  seokchonServer,
}
