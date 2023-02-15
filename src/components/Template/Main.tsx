import React, { ReactElement } from 'react'
import { Flex } from 'theme-ui'

type MainTemplateProps = {
  children: ReactElement | ReactElement[]
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return <Flex>{children}</Flex>
}

export default MainTemplate
