import { headers as nextHeaders } from 'next/headers'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const headers = nextHeaders()

  const { id } = params

  return new Response(
    JSON.stringify({ id, attributes: { name: 'Outer', price: 20000, like: 58 } }),
    {
      headers,
      status: 200,
      statusText: 'Success',
    }
  )
}
