import { useQuery } from '@tanstack/react-query'
import { createSelector } from 'reselect'

import { ResponseError } from '../../../../@types'
import { ProductItem } from '../../../../@types/product'

import { api } from '~services/api'

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

const useGetProductSelector = (data: ProductProps) => {
  const { data: response } = useGetProduct(data)

  return selectProduct(response)
}

export default useGetProductSelector
