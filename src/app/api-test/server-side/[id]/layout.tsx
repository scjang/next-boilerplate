import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '제목!',
  description: '설명..',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default Layout
