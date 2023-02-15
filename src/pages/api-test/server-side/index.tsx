import React from 'react'

import getProduct from '~hooks/feature/product/api/useGetProduct'

interface PropsName {
  name: string
}

const serverSide = ({ name }: PropsName) => {
  return (
    <p>
      Get product name is <span style={{ fontWeight: 'bold', color: 'red' }}>{name}</span>
    </p>
  )
}

serverSide.getInitialProps = async () => {
  const product = await getProduct()
  const {
    descriptions: { name },
  } = product

  return { props: { name } }
}

export default serverSide
