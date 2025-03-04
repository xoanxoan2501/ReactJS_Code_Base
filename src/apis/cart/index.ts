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
  totalPayment: 0
}

export const updateProductQuantity = createAsyncThunk(
  'cart/updateProductQuantity',
  async (data: { productId: string; quantity: number; size: string }) => {
    const response = await httpRepoInstance.put('/cart/edit-cart', data)
    return response.data
  }
)
export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ productId, size }: { productId: string; size: string }) => {
    await httpRepoInstance.delete(`/cart/delete-cart`, {
      data: { productId, size }
    })
    return productId
  }
)
const cartStore = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload)
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.productId !== action.payload)
    },
    setCart: (state, action) => {
      state.cartId = action.payload._id
      state.cart = action.payload.products
    },

    handleRowSelectionChange: (state, action: PayloadAction<GridRowSelectionModel>) => {
      state.selectedCartItems = state.cart.filter((item) => {
        return action.payload.includes(item.productId as GridRowId)
      })
      state.totalPayment = state.selectedCartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    resetSelecdCartItem: (state) => {
      state.selectedCartItems = []
      state.totalPayment = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartAPI.fulfilled, (state, action) => {
        state.cart = action.payload.products
        state.cartId = action.payload._id
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.cart = action.payload.products
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.productId !== action.payload)
      })
  }
})

export const { addCart, removeCart, setCart, handleRowSelectionChange, resetSelecdCartItem } = cartStore.actions

export const cartReducer = cartStore.reducer
