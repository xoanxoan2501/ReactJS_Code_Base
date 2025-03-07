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
  quantity: number
  price: number
  total: number
  size: string
  title: string
  note: string
}

interface OrderState {
  orderInfo: Order
}

const initialState: OrderState = {
  orderInfo: {
    fullName: '',
    address: '',
    email: '',
    phoneNumber: '',
    total: 0,
    shippingMethod: '',
    shippingAddress: '',
    trackingNumber: 'TRACK123456',
    paymentMethod: '',
    orderDetails: []
  }
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrder: (state, action: PayloadAction<Partial<Order>>) => {
      state.orderInfo = {
        ...state.orderInfo,
        ...action.payload
      }
    }
  }
})

export const { updateOrder } = orderSlice.actions
export default orderSlice.reducer
