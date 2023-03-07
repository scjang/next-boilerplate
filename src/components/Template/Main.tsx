import Link from 'next/link'
import React, { ReactElement } from 'react'
import { Flex } from 'theme-ui'

type MainTemplateProps = {
  children: ReactElement | ReactElement[]
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <Flex sx={{ width: '250px', justifyContent: 'space-between' }}>
        <Link href={'/api-test/client-side/1'}>client side</Link>
        <Link href={'/api-test/server-side/1'}>server side</Link>
      </Flex>
      <Flex>{children}</Flex>
    </>
  )
}

export default MainTemplate
