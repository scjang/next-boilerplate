import { NextFunction, Request, Response } from 'express'

const logger = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.url.includes('_next')) {
    const log = `[${new Date()}] ${req.get('User-agent')} || ${req.url}`
    console.log(log)
  }
  return next()
}

export default logger
