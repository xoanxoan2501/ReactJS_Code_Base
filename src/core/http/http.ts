import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import CONFIG from '@/config'
import { Dispatch, Store } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

let reduxStore: Store & { dispatch: Dispatch }

export const injectStore = (store: Store) => {
  reduxStore = store
}

interface HttpRepositoryOptions {
  baseURL?: string
  timeout?: number
}

class HttpRepository {
  private instance: AxiosInstance
  private defaultConfig = {
    timeout: 1000 * 60 * 10, // 10 phút
    baseURL: import.meta.env.DEV ? CONFIG.API_BASE_URL : CONFIG.API_SERVER_URL
  }

  constructor(options: HttpRepositoryOptions = {}) {
    this.instance = axios.create({
      ...this.defaultConfig,
      ...options
    })
    this.setupInterceptors()
  }

  public getInstance() {
    return this.instance
  }

  private setupInterceptors() {
    // Interceptor cho request
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Interceptor cho response
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        let errorMessage = error.message
        if (error.response?.data?.message && !error.response?.data?.message.includes('jwt expired')) {
          errorMessage = error.response.data.message
        }

        if (error.response?.status !== 410) {
          toast.error(errorMessage)
        }

        return Promise.reject(error)
      }
    )
  }
}

// Tạo instance mặc định
const defaultHttpRepository = new HttpRepository()
export const httpRepoInstance = defaultHttpRepository.getInstance()

// Hoặc dùng instance mặc định
export default httpRepoInstance

export const customHttpInstance = (url: string) => {
  return new HttpRepository({
    baseURL: url
  }).getInstance()
}
