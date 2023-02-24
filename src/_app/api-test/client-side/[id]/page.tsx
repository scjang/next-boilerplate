'use client'

import React from 'react'

import useGetProductSelector from '~hooks/feature/product/api/useGetProduct'

const ClientSide = ({ params: { id } }: { params: { id: number } }) => {
  const { attributes } = useGetProductSelector({ id: Number(id) || 1 })

  const { name } = attributes ?? { name: '' }

  return (
    <div>
      <h1>Client Side</h1>
      <div>{name}</div>
    </div>
  )
}

export default ClientSide
