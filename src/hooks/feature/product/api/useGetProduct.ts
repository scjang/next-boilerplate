import { useEffect, useState } from 'react'

import { api } from '~services/api'

const getProduct = () => api({ key: 'getProduct', data: { id: 1278016 } })

export const useGetProduct = () => {
  const [productName, setProductName] = useState('')

  useEffect(() => {
    const asyncWrapper = async () => getProduct()

    asyncWrapper().then((res) => {
      const {
        descriptions: { name },
      } = res

      setProductName(name)
    })
  }, [])

  return { productName, setProductName }
}

export default getProduct
