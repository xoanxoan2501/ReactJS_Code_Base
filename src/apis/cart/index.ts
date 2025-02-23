import httpRepoInstance from '@/core/http/http'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GridRowId, GridRowSelectionModel } from '@mui/x-data-grid'

export interface ICartItem {
  productId: string
  title: string
  quantity: number
  price: number
  thumbnail: string
  size: string
}

interface ICartStore {
  cartId?: string | null
  cart: ICartItem[]
  selectedCartItems: ICartItem[]
  totalPayment: number
}

export const getCartAPI = createAsyncThunk('cart/getCart', async () => {
  const response = await httpRepoInstance.get('/cart/get-cart')
  return response.data
})

const initialState: ICartStore = {
  cartId: null,
  cart: [],
  selectedCartItems: [],
  totalPayment: 0,
}

const cartStore = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload)
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      )
    },
    setCart: (state, action) => {
      state.cartId = action.payload._id
      state.cart = action.payload.products
    },
    handleRowSelectionChange: (
      state,
      action: PayloadAction<GridRowSelectionModel>
    ) => {
      state.selectedCartItems = state.cart.filter((item) => {
        return action.payload.includes(item.productId as GridRowId)
      })
      state.totalPayment = state.selectedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartAPI.fulfilled, (state, action) => {
      state.cart = action.payload.products
    })
  },
})

export const { addCart, removeCart, setCart, handleRowSelectionChange } =
  cartStore.actions

export const cartReducer = cartStore.reducer
