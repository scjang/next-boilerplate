import type { Metadata } from 'next'
import React from 'react'

import Providers from './Provider'

export const metadata: Metadata = {
  title: "Let's play",
  description: '메인설명',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang={'ko'}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
