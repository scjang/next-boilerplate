'use client'

import React, { Suspense } from 'react'
import { Box } from 'theme-ui'

import ProductName from '~components/Atoms/ProductName'

interface ClientSideProps {
  params: Promise<{
    id: number
  }>
}

const ClientSide = async ({ params }: ClientSideProps) => {
  const { id } = await params

  return (
    <div>
      <h1>Client Side</h1>

      <Suspense fallback={<Box>Loading...</Box>}>
        <ProductName id={id} />
      </Suspense>
    </div>
  )
}

export default ClientSide
