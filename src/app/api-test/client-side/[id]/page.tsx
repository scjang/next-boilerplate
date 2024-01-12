'use client'

import React from 'react'

import { useGetProductItem } from '~hooks/feature/product/api/useGetProduct'

const ClientSide = ({ params: { id } }: { params: { id: number } }) => {
  const { data } = useGetProductItem(id)

  const { attributes } = data ?? {}

  const { name } = attributes ?? {}

  return (
    <div>
      <h1>Client Side</h1>
      <div>{name}</div>
    </div>
  )
}

export default ClientSide
