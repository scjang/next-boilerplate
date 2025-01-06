// import { headers as nextHeaders } from 'next/headers'
//
// interface IErrorParams {
//   params: {
//     httpStatusCode: number
//   }
// }
//
// export async function GET(_request: Request, { params: { httpStatusCode } }: IErrorParams) {
//   const headers = nextHeaders()
//
//   return new Response(JSON.stringify({ httpStatusCode }), {
//     headers,
//     status: httpStatusCode,
//     statusText: 'Error',
//   })
// }

import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(_req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}
