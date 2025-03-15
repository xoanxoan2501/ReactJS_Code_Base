import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum OrderStatus {
  PENDING = 'pending',
  PREPARE = 'prepare',
  SHIPPING = 'shipping',
  COMPLETED = 'completed',
  REFUND = 'refund',
  CANCEL = 'cancel'
}

export const ORDER_STATUS_VI = {
  [OrderStatus.PENDING]: 'Chờ xác nhận',
  [OrderStatus.PREPARE]: 'Đang chuẩn bị',
  [OrderStatus.SHIPPING]: 'Đang giao hàng',
  [OrderStatus.COMPLETED]: 'Hoàn thành',
  [OrderStatus.REFUND]: 'Hoàn trả/đổi trả',
  [OrderStatus.CANCEL]: 'Đã hủy'
} as const

export interface Order {
  _id?: string
  orderId?: string
  fullName: string
  address: string
  email: string
  phoneNumber: string
  orderDate?: string
  status?: OrderStatus
  voucher?: string
  shippingFee?: number
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

export interface OrderDetail {
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
    orderDetails: [],
    shippingFee: 0
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
