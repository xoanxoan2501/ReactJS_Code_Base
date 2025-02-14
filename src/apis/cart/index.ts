import httpRepoInstance from '@/core/http/http'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ICartItem {
  productId: string
  title: string
  quantity: number
  price: number
  thumbnail: string
}

interface ICartStore {
  cartId?: string | null
  cart: ICartItem[]
  selectedCartItems: ICartItem[]
}

const getCartAPI = createAsyncThunk('cart/getCart', async () => {
  const response = await httpRepoInstance.get('/cart')
  return response.data
})

const initialState: ICartStore = {
  cartId: null,
  cart: [],
  selectedCartItems: []
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCartAPI.fulfilled, (state, action) => {
      state.cart = action.payload.products
    })
  }
})

export const { addCart, removeCart, setCart } = cartStore.actions

export const cartReducer = cartStore.reducer
