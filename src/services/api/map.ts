export type MapKey = keyof typeof urlMap

const apiServer = process.env.API_SERVER
const errorApiServer = process.env.ERROR_API_SERVER

const urlMap = {
  get400Error: {
    url: `${errorApiServer}/error/400`,
    method: 'GET',
  },
  get500Error: {
    url: `${errorApiServer}/error/500`,
    method: 'GET',
  },
  getProducts: {
    url: `${apiServer}/products`,
    method: 'GET',
  },
  getProduct: {
    url: `${apiServer}/products/:id`,
    method: 'GET',
  },
  getCategories: {
    url: `${apiServer}/siteCategories`,
    method: 'GET',
  },
}

const map = (key: MapKey) => urlMap[key]

export default map
