import { AxiosError, AxiosResponse } from 'axios'

import { ResponseError } from '~types/index'

const peelOffAxios = async <TData>(fetcher: () => Promise<AxiosResponse<TData>>) =>
  fetcher()
    .then((res) => res.data)
    .catch((err: AxiosError<ResponseError>) => {
      throw err.response?.data
    })

export default peelOffAxios
