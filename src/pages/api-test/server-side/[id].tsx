import { dehydrate, QueryClient } from '@tanstack/react-query'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import useGetProductSelector, { getProduct } from '~hooks/feature/product/api/useGetProduct'

const serverSide = () => {
  const { query: id } = useRouter()

  const { attributes } = useGetProductSelector({ id: Number(id) || 1 })

  const { name } = attributes ?? {}

  return (
    <p>
      Get product name is <span style={{ fontWeight: 'bold', color: 'red' }}>{name}</span>
    </p>
  )
}

export const getServerSideProps = async ({ query: { id } }: NextPageContext) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['product', id], () => getProduct({ id: Number(id) || 1 }))

  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default serverSide
