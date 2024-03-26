import BaseApi from '~services/api/BaseApi'

class ErrorApi extends BaseApi {
  constructor(url?: string) {
    super({ baseURL: url ?? `${process.env.API_SERVER}` })
  }

  getError = (httpStatusCode: number) => {
    return this.axios.get(`/api/errors/${httpStatusCode}`)
  }
}

export default new ErrorApi()
