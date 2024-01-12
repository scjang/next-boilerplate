import { dehydrate } from '@tanstack/react-query'
import React from 'react'

import Hydrate from '../../../Hydrate'

import ProductName from '~components/Atoms/ProductName'
import { getProductItem } from '~hooks/feature/product/api/useGetProduct'
import { getQueryClient } from '~utils/getQueryClient'

const ServerSide = async ({ params: { id } }: { params: { id: number } }) => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(['product', id], () => getProductItem(id))

  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <div>
        <h1>Server Side</h1>

        <ProductName id={id} />
      </div>
    </Hydrate>
  )
}

export default ServerSide
