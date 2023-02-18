import { Method } from 'axios'
import { Response } from 'express'

import { MapKey } from './map'

const EXPIRE_TIME = 3600000

export interface ApiConfig {
  key: MapKey
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any }
  cookie?: string
}

const findParamsInUrl = (url: string) => {
  const regexp = /(?::)(\D\w+)/gim
  const params = url.match(regexp)
  return params && params.length > 0 ? params.map((match) => match.replace(':', '')) : []
}

const makeRequestUrl = (url: string, params: string[], data: { [key: string]: string }) => {
  if (!params) return url
  let requestUrl = url
  params.forEach((param) => {
    requestUrl = requestUrl.replace(`:${param}`, data[param])
  })
  return requestUrl
}

const bodyBuilder = (params: string[], body: { [key: string]: string }) => {
  if (!params) return body
  params.forEach((param) => {
    // eslint-disable-next-line no-param-reassign
    if (body[param]) delete body.param
  })
  return body
}

const getApiOptions = (config: ApiConfig) => {
  const { key, data: rawData, cookie } = config

  // eslint-disable-next-line global-require
  const apiMap = require('./map')

  const data = { ...rawData, accessToken: cookie || '' }

  const { url, method } = apiMap.default(key)

  const params = findParamsInUrl(url)

  const requestUrl = makeRequestUrl(url, params, data)

  const body = bodyBuilder(params, data)

  return {
    url: requestUrl,
    method: method as Method,
    ...(method.toLowerCase() === 'get' ? { params: body } : { data: body }),
    validateStatus: (status: number) => status >= 200 && status < 400,
  }
}

const getProxyApiOptions = (config: ApiConfig) => {
  return {
    method: 'post' as Method,
    url: `/api/${config.key}`,
    data: config.data,
    validateStatus: (status: number) => status >= 200 && status < 400,
  }
}

const setAccessTokenIntoCookie = (res: Response, at: string) => {
  res.cookie('at', at, {
    domain: process.env.DOMAIN,
    expires: new Date(Date.now() + EXPIRE_TIME),
  })
}

export { getApiOptions, getProxyApiOptions, setAccessTokenIntoCookie }
