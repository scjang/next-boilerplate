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

const hasMatchString = (original: string, comparable: string) => original.includes(comparable)

const getApiOptions = (config: ApiConfig) => {
  const { key, data: rawData, cookie } = config

  const gatewayUrl = `${process.env.API_SERVER}/admin`

  // eslint-disable-next-line global-require
  const apiMap = require('./map')

  const data = { ...rawData, accessToken: cookie || '' }

  const { url, method } = apiMap.default(key)

  const params = findParamsInUrl(url)

  const requestUrl = makeRequestUrl(url, params, data)

  const body = bodyBuilder(params, data)

  const isGateway = hasMatchString(requestUrl, gatewayUrl)

  const headers = {
    ...(!isGateway
      ? {
          Authorization: `Basic ${Buffer.from('seoulstore:devteam!').toString('base64')}`,
          'D-Authorization': 'bXlnb29kczpjanJjanJxa3I0ZHlkZ25sV2tk',
        }
      : {
          'SEOULSTORE-Authorization': `${Buffer.from('seoulstore:devteam!').toString('base64')}`,
          Authorization: `Bearer ${cookie}`,
        }),
  }

  return {
    url: requestUrl,
    method: method as Method,
    headers,
    ...(method.toLowerCase() === 'get' ? { params: body } : { data: body }),
    validateStatus: (status: number) => status >= 200 && status < 400,
  }
}

const getProxyApiOptions = (config: ApiConfig) => {
  return {
    method: 'post',
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
