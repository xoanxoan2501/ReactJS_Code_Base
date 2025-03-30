import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import httpRepoInstance from '@/core/http/http'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'

export const authKeys = {
  all: ['fetchCategories'],
  fetchCategoriesPagination: (
    page: number | undefined | null,
    limit: number | undefined | null,
    q: string | undefined | null
  ) => {
    return [...authKeys.all, page || DEFAULT_PAGE, limit || DEFAULT_LIMIT_PER_PAGE, q]
  },
  fetchUser: (id: string) => ['fetchUser', id]
}
export interface ICategory {
  _id: string
  name: string
  description: string
}

export interface ICategoryStore {
  categories: ICategory[]
  total: number
  page: number
  limit: number
  q?: string
  isLoading: boolean
  error?: string
}

const initialState: ICategoryStore = {
  categories: [],
  total: 0,
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT_PER_PAGE,
  q: '',
  isLoading: false,
  error: undefined
}

export const getCategoryAPI = createAsyncThunk(
  'category/getCategory',
  async ({ page, limit, q }: { page: number; limit: number; q?: string }) => {
    let querypath = `?page=${page}&limit=${limit}`
    if (q) querypath += `&q=${q}`
    const response = await httpRepoInstance.get(`/categories${querypath}`)
    return response.data
  }
)

const categoryStore = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAPI.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(getCategoryAPI.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload.categories
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.q = action.payload.q
      })
      .addCase(getCategoryAPI.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const categoryReducer = categoryStore.reducer
