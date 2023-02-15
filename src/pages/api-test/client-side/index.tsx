import React from 'react'

import { useGetProduct } from '~hooks/feature/product/api/useGetProduct'

const clientSide = () => {
  const { productName } = useGetProduct()

  return (
    <p>
      Get product name is <span style={{ fontWeight: 'bold', color: 'blue' }}>{productName}</span>
    </p>
  )
}

export default clientSide
