import axios from 'axios'
import { AxiosInstance } from 'axios'

interface AxiosConfig {
  baseURL: string
}

class Api {
  public baseURL: string

  public axios: AxiosInstance

  constructor({ baseURL }: AxiosConfig) {
    this.baseURL = baseURL

    this.axios = axios.create({
      baseURL,
      timeout: 15000,
    })

    // this.axios.interceptors.response.use((response) => {
    //   return response.data || response
    // })
  }
}

export default Api
