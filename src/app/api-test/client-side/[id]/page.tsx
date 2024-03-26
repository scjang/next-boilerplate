'use client'

import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ProductName from '~components/Atoms/ProductName'
import ErrorFallback from '~components/ErrorFallback'

interface ClientSideProps {
  params: {
    id: number
  }
}

const ClientSide = ({ params: { id } }: ClientSideProps) => {
  return (
    <div>
      <h1>Client Side</h1>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProductName id={id} />
      </ErrorBoundary>
    </div>
  )
}

export default ClientSide
