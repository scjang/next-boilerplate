import { Combine } from '@types'
import axios from 'axios'
import { NextFunction, Response, Request } from 'express'

import { MapKey } from './map'
import { ApiConfig, getApiOptions, getProxyApiOptions, setAccessTokenIntoCookie } from './option'

interface BaseReq {
  params: {
    key: MapKey
  }
  data: { [key: string]: string }
}

type CombineRequest = Combine<BaseReq, Request>

const callApi = async <T>(options: T) => {
  try {
    const { data } = await axios(options)

    return data.data || data
  } catch (error) {
    throw error.response.data
  }
}

export const api = (config: ApiConfig) => {
  const isBrowser = typeof window !== 'undefined'

  if (!isBrowser) {
    const options = getApiOptions(config)

    console.log('Called from the server', options)

    return callApi(options)
  }

  const options = getProxyApiOptions(config)

  console.log('Called from the browser', options)

  return callApi(options)
}

export const proxy = async (req: Request, res: Response, next: NextFunction) => {
  const request = (req as unknown) as CombineRequest

  const {
    params: { key },
    body,
    cookies: { at: cookie },
  } = request

  const options = getApiOptions({
    key,
    data: body,
    cookie,
  })

  console.log('Called from the proxy', options)

  try {
    const { status, data } = await axios(options)

    // todo: Modify this condition to suit project
    if (options.url.includes('/auth/admin')) setAccessTokenIntoCookie(res, data.data.accessToken)

    res.status(status).json(data.data || data)
  } catch (error) {
    next(error.response)
  }
}
