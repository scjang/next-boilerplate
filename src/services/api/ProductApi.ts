import BaseApi from '~services/api/BaseApi'

class ProductApi extends BaseApi {
  constructor(url?: string) {
    super({ baseURL: url ?? `${process.env.NEXT_PUBLIC_API_SERVER}` })
  }

  getProductItem = (id: number) => this.axios.get(`/api/products/${id}`)
}

export default new ProductApi()
