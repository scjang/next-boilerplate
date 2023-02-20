export interface ProductItem {
  id: number
  attributes: {
    name: string
    price: number
    image: string
    isSoldOut: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}
