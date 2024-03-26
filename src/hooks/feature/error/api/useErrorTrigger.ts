import { useQuery } from '@tanstack/react-query'

import ErrorApi from '~services/api/ErrorApi'
import peelOffAxios from '~utils/peelOffAxios'

export const errorTrigger = (httpStatusCode: number) =>
  peelOffAxios(() => ErrorApi.getError(httpStatusCode))

export const useErrorTrigger = (httpStatusCode: number) =>
  useQuery(['something'], () => errorTrigger(httpStatusCode))
