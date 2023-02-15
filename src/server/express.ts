import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'

interface Error {
  status?: number
  statusText?: string
  data?: {
    status: string
    message: string
  }
}

export default (routes: express.Router) => {
  const app = express()

  app.use(cors())
  app.use(compression())
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }))
  app.use(bodyParser.json({ limit: '100mb' }))

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== 'production')
      res.header('Access-Control-Allow-Origin', `${req.protocol}://${req.hostname}`)
    else res.header('Access-Control-Allow-Origin', `https://${req.hostname}`)

    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
    )

    // intercepts OPTIONS method
    if (req.method === 'OPTIONS') {
      // respond with 200
      res.status(200).end()
    } else {
      // move on
      next()
    }
  })

  app.use(routes)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _: unknown, res: Response, _next: NextFunction) => {
    const { status, statusText, data } = err
    res.status(err.status || 400)
    const errJson = {
      ...(data ? { status, statusText, message: data.message } : { status, statusText }),
    }
    res.json(errJson)
  })

  return app
}
