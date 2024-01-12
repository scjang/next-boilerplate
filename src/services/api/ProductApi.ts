import BaseApi from '~services/api/BaseApi'
import { ProductItem } from '~types/product'

class ProductApi extends BaseApi {
  constructor(url?: string) {
    super({ baseURL: url ?? `${process.env.API_SERVER}` })
  }

  getProductItem = (id: number) => {
    return this.axios.get<ProductItem>(`/api/products/${id}`)
  }
}

export default new ProductApi()
