'use client'

import React from 'react'

import ProductName from '~components/Atoms/ProductName'

const ClientSide = ({ params: { id } }: { params: { id: number } }) => {
  return (
    <div>
      <h1>Client Side</h1>

      <ProductName id={id} />
    </div>
  )
}

export default ClientSide
