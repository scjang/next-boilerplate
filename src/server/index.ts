import { Router, Request, Response } from 'express'
import next from 'next'

import express from './express'
import logger from './logger'

import { proxy } from '~services/api'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 9000
const ip = '0.0.0.0'
const router = Router()

router.post('/api/get500Error', (_req: Request, res: Response) => {
  res.status(500).json({ message: '500 Error', code: 500 }).end()
})

router.post('/api/get400Error', (_req: Request, res: Response) => {
  res.status(400).json({ message: '400 Error', code: 400 }).end()
})

router.post('/api/:key', proxy)

router.get('/health-check', [
  logger,
  (_req: Request, res: Response) => {
    res.status(200).end()
  },
])

router.get('*', [
  logger,
  (req: Request, res: Response) => {
    return handle(req, res)
  },
])

app.prepare().then(() => {
  const server = express(router)

  server.listen(port, ip, () => {
    console.log(`> Ready on ${ip}:${port} - env ${process.env.NODE_ENV}`)
  })
})
