import { AxiosError, AxiosResponse } from 'axios'

import { ResponseError } from '~types/index'

const peelOffAxios = async <TData>(fetcher: () => Promise<AxiosResponse<TData>>) => {
  try {
    const res = await fetcher()

    return res
  } catch (err) {
    throw (err as AxiosError<ResponseError>).response?.data
  }
}

export default peelOffAxios
