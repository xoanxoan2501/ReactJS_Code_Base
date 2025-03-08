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
  defaultAddress?: {
    address: string
    district: string
    fullname: string
    phoneNumber: string
    province: string
    isDefault: boolean
  }
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
    trackingNumber: '',
    paymentMethod: '',
    orderDetails: [],
    defaultAddress: {
      address: '',
      district: '',
      fullname: '',
      phoneNumber: '',
      province: '',
      isDefault: false
    }
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
