import { headers as nextHeaders } from 'next/headers'

interface IErrorParams {
  params: {
    httpStatusCode: number
  }
}

export async function GET(_request: Request, { params: { httpStatusCode } }: IErrorParams) {
  const headers = nextHeaders()

  return new Response(JSON.stringify({ httpStatusCode }), {
    headers,
    status: httpStatusCode,
    statusText: 'Error',
  })
}
