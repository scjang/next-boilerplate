import { NextPageContext } from 'next'
import React from 'react'

interface PropsStatusCode {
  statusCode: number
}

const Error = ({ statusCode }: PropsStatusCode) => {
  return <h1>{statusCode}</h1>
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const rslt = res ? res.statusCode : err
  const statusCode = rslt ? err?.statusCode : 404
  return { statusCode }
}

export default Error
