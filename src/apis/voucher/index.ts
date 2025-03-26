import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface IVoucher {
  _id?: string
  code?: string
  description?: string
  discountType?: 'percent' | 'fixed'
  discountValue?: number
  minOrderValue?: number
  maxDiscount?: number | null
  expirationDate?: string
  isActive?: boolean
  createdAt?: number
  updatedAt?: number | null
  _destroy?: boolean
  usageLimit?: number | null
  usageCount?: number
  applicableCategories?: string[]
  applicableProducts?: string[]
}

export interface IVoucherStore {
  voucherDetail: IVoucher | null
  isShowVoucherDetail: boolean
}

const initialState: IVoucherStore = {
  voucherDetail: null,
  isShowVoucherDetail: false
}

const voucherStore = createSlice({
  name: 'voucher',
  initialState: initialState,
  reducers: {
    setVoucherDetail: (state, action: PayloadAction<IVoucher>) => {
      state.voucherDetail = action.payload
    },
    setShowVoucherDetail: (state, action: PayloadAction<boolean>) => {
      state.isShowVoucherDetail = action.payload
    }
  }
})

export const { setVoucherDetail, setShowVoucherDetail } = voucherStore.actions

export const voucherReducer = voucherStore.reducer
