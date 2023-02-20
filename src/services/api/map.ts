export type MapKey = keyof typeof urlMap

const apiServer = process.env.API_SERVER
// const sinsaServer = process.env.SINSA_SERVER
// const seokchonServer = process.env.SEOKCHON_SERVER

const urlMap = {
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
