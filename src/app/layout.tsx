import React, { Suspense } from 'react'

import Providers from './Provider'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang={'ko'}>
      <head />

      <body>
        <Providers>
          <Suspense fallback={<div>....Loading....</div>}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
