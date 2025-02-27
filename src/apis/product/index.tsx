import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IProduct {
  _id?: string
  title?: string
  description?: string
  categoryId?: string
  category?: Category[]
  sizes?: Array<{
    size: string
    stock: number
    price: number
  }>
  status?: string
  thumbnail?: string
  code?: string
  images?: Array<string>
  createdAt?: string
  updatedAt?: string
  _destroy?: boolean
}

interface Category {
  _id: string
  name: string
  description: string
  createdAt: number // Sử dụng kiểu `number` vì đây là timestamp.
  updatedAt: number | null // Có thể là `null` nếu chưa được cập nhật.
  _destroy: boolean // Biến boolean cho biết trạng thái "bị xóa" của item.
}

export interface IProductStore {
  productDetail: IProduct | null
  isShowProductDetail: boolean
}

const initialState: IProductStore = {
  productDetail: null,
  isShowProductDetail: false
}

const productStore = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setProductDetail: (state, action: PayloadAction<IProduct>) => {
      state.productDetail = action.payload
    },
    setShowProductDetail: (state, action: PayloadAction<boolean>) => {
      state.isShowProductDetail = action.payload
    }
  }
})

export const { setProductDetail, setShowProductDetail } = productStore.actions

export const productReducer = productStore.reducer
