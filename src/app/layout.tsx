import React from 'react'

import Providers from './Provider'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang={'ko'}>
      <head>
        <title>Let&#39;s play</title>
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
