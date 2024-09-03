'use client'

import React from 'react'
import { Box } from 'theme-ui'

const Page = () => {
  return (
    <>
      <Box>
        <a href={'/api-test/client-side/1'}>client-side</a>
      </Box>

      <Box>
        <a href={'/api-test/server-side/1'}>server-side</a>
      </Box>
    </>
  )
}

export default Page
