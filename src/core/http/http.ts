import axios, { AxiosInstance } from 'axios'
import CONFIG from '@/config'
import { Dispatch, Store } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

let reduxStore: Store & { dispatch: Dispatch }

export const injectStore = (store: Store) => {
  reduxStore = store
}

class HttpRepository {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: CONFIG.API_BASE_URL,
      timeout: 1000 * 60 * 10
    })
  }

  public getInstance() {
    return this.instance
  }
}

const httpRepository = new HttpRepository()
const httpRepoInstance = httpRepository.getInstance()

httpRepoInstance.defaults.withCredentials = true

// Interceptor cho request
httpRepoInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu cần
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Xử lý lỗi request

    return Promise.reject(error)
  }
)

let refreshTokenRequest: Promise<any> | null = null

// Interceptor cho response
httpRepoInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // Xử lý lỗi response
    let errorMessage = error.message
    if (
      error.response?.data?.message &&
      !error.response?.data?.message.includes('jwt expired')
    ) {
      errorMessage = error.response.data.message
    }

    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default httpRepoInstance
