import { useQuery } from '@tanstack/react-query'
import { createSelector } from 'reselect'

import { api } from '~services/api'
import ProductApi from '~services/api/ProductApi'
import { ResponseError } from '~types/index'
import { ProductItem } from '~types/product'
import peelOffAxios from '~utils/peelOffAxios'

type ProductProps = {
  id: number
}

export const getProduct = async (data: ProductProps) => api({ key: 'getProduct', data })

export const useGetProduct = (data: ProductProps) => {
  const { id } = data

  return useQuery<ProductItem, ResponseError>(['product', id], () => getProduct(data))
}

const selectProduct = createSelector(
  (state: ProductItem | undefined) => state,
  (state) => ({
    id: state?.id,
    attributes: state?.attributes,
  })
)

export const useGetProductSelector = (data: ProductProps) => {
  const { data: response } = useGetProduct(data)

  return selectProduct(response)
}

export const getProductItem = async (id: number) =>
  peelOffAxios(() => ProductApi.getProductItem(id))

export const useGetProductItem = (id: number) => {
  return useQuery(['product', id], () => getProductItem(id))
}
