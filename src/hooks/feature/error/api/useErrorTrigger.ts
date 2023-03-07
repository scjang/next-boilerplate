import { useQuery } from '@tanstack/react-query'

import { api } from '~services/api'

export const get500Error = async () => api({ key: 'get500Error', data: {} })

export const useGet500Error = () => useQuery(['500'], get500Error)

export const get400Error = async () => api({ key: 'get400Error', data: {} })

export const useGet400Error = () => useQuery(['400'], get400Error)
