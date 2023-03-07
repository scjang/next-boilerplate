import { Combine } from '@types'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
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

const callApi = async (options: AxiosRequestConfig) => {
  try {
    console.log(11)
    const { data } = await axios(options)

    return data.data || data
  } catch (error: AxiosError | unknown) {
    const { isAxiosError } = axios

    if (isAxiosError(error)) {
      throw error.response?.data
    }

    throw error
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
  const request = req as unknown as CombineRequest

  const {
    params: { key },
    body,
    // cookies: { at: cookie },
  } = request

  const options = getApiOptions({
    key,
    data: body,
    // cookie,
  })

  console.log('Called from the proxy', options)

  try {
    const { status, data } = await axios(options)

    // todo: have to modify this condition to fit your project
    if (options.url.includes('/auth/admin')) setAccessTokenIntoCookie(res, data.data.accessToken)

    console.log(data)

    res.status(status).json(data.data || data)
  } catch (error: AxiosError | unknown) {
    const { isAxiosError } = axios

    if (isAxiosError(error)) return next(error.response?.data)

    next(error)
  }
}
