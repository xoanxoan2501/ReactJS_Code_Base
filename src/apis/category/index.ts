import httpRepoInstance from '@/core/http/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ICategoryStore {
  categoryId: string
  name: string
  description: string
}

const getCategoryAPI = createAsyncThunk('category/getCategory', async () => {
  const response = await httpRepoInstance.get('/categories')
  return response.data
})

const initialState: ICategoryStore = {
  categoryId: '',
  name: '',
  description: ''
}

const categoryStore = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryAPI.fulfilled, (state, action) => {
      state = action.payload
    })
  }
})

// export const {} = categoryStore.actions

export const categoryReducer = categoryStore.reducer
