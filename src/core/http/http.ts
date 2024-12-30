import axios, { AxiosInstance } from 'axios'
import CONFIG from '@/config'
import store from '@/core/store/redux'
import { RootState } from '@/modules'

class HttpRepository {
  private instance: AxiosInstance
  private token?: string
  private refreshToken?: string

  constructor() {
    this.instance = axios.create({
      baseURL: CONFIG.API_BASE_URL,
      timeout: 1000 * 60 * 5
    })

    const state: RootState = store.getState()
    this.token = state?.profile?.token
    this.refreshToken = state?.profile?.refreshToken

    store.subscribe(() => {
      const newState: RootState = store.getState()
      this.token = newState.profile.token
      this.refreshToken = newState?.profile?.refreshToken
    })

    this.instance.defaults.withCredentials = true
  }

  public getInstance() {
    return this.instance
  }
}

const httpRepository = new HttpRepository()
const httpRepoInstance = httpRepository.getInstance()
export default httpRepoInstance
