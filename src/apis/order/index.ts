import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Order {
  fullName: string
  address: string
  email: string
  phoneNumber: string
  orderDate?: string
  status?: string
  total: number
  shippingMethod: string
  shippingAddress: string
  shippingDate?: string
  trackingNumber: string
  paymentMethod: string
  paymentDate?: string
  userId?: string
  orderDetails: OrderDetail[]
}

interface OrderDetail {
  productId: string
  title: string
  quantity: number
  price: number
  total: number
  size: string
  note: string
}

interface OrderState {
  shippingMethod: string
}

const initialState: OrderState = {
  shippingMethod: 'cod'
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setShippingMethod: (state, action: PayloadAction<string>) => {
      state.shippingMethod = action.payload
    }
  }
})

export const { setShippingMethod } = orderSlice.actions
export default orderSlice.reducer
