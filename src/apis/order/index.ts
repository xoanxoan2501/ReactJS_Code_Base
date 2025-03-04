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
