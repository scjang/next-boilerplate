'use client'

import React from 'react'

import { useGetProductItem } from '~hooks/feature/product/api/useGetProduct'

interface ProductNameProps {
  id: number
}

const ProductName = ({ id }: ProductNameProps) => {
  const { data } = useGetProductItem(id, { enabled: !!id })

  console.log(data)

  const { attributes } = data ?? {}

  const { name } = attributes ?? {}

  return <div>{name}</div>
}

export default ProductName
