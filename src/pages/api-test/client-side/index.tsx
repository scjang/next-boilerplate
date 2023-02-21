import React from 'react'

import useGetProductSelector from '~hooks/feature/product/api/useGetProduct'

const clientSide = () => {
  const { attributes } = useGetProductSelector({ id: 1 })

  const { name } = attributes ?? {}

  return (
    <p>
      Get product name is <span style={{ fontWeight: 'bold', color: 'blue' }}>{name}</span>
    </p>
  )
}

export default clientSide
