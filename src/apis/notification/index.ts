import { Order } from '@/apis/order'
import { IVoucher } from '@/apis/voucher'

export type INotification = { type: 'order'; data: Order } | { type: 'voucher'; data: IVoucher }
