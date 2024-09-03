import BaseApi from '~services/api/BaseApi'

class ProductApi extends BaseApi {
  constructor(url?: string) {
    super({ baseURL: url ?? `${process.env.API_SERVER}` })
  }

  getProductItem = (id: number) => {
    return this.axios.get(`/api/products/${id}`)
  }
}

export default new ProductApi()
