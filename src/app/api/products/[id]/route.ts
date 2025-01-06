import { headers as nextHeaders } from 'next/headers'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const headers = await nextHeaders()

  const { id } = await params

  return new Response(
    JSON.stringify({ id, attributes: { name: 'Outer', price: 20000, like: 58 } }),
    {
      headers,
      status: 200,
      statusText: 'Success',
    }
  )
}
