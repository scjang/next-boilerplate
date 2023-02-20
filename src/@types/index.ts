export type Combine<T, K> = T & Omit<K, keyof T>

export interface ResponseError {
  status: number
  statusText: string
  message: {
    expiredAt: string
    message: string
    name: string
  }
}
