'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

// import { useErrorTrigger } from '~hooks/feature/error/api/useErrorTrigger'
import { useGetProductItem } from '~hooks/feature/product/api/useGetProduct'

interface ProductNameProps {
  id: number
}

const ProductName = ({ id }: ProductNameProps) => {
  const { data } = useGetProductItem(id, { enabled: !!id })

  const { attributes } = data ?? {}

  const { name } = attributes ?? {}

  const { get } = useSearchParams()

  console.log(get('httpStatusCode'))

  // useErrorTrigger(Number(get('httpStatusCode')))

  return <div>{name}</div>
}

export default ProductName
