import { useRouter } from 'next/router'
import React from 'react'

// import { useGet500Error } from '~hooks/feature/error/api/useErrorTrigger'
import { useGetProductSelector } from '~hooks/feature/product/api/useGetProduct'

const clientSide = () => {
  const {
    query: { id },
  } = useRouter()

  const { attributes } = useGetProductSelector({ id: Number(id) || 1 })

  // useGet500Error()

  const { name } = attributes ?? {}

  return (
    <p>
      Get product name is <span style={{ fontWeight: 'bold', color: 'blue' }}>{name}</span>
    </p>
  )
}

export default clientSide
