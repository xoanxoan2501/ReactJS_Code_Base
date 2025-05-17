import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface ICustomer {
  _id?: string
  fullname?: string
  email?: string
  phoneNumber?: string
  address?: string
  province?: string
  district?: string
  displayName?: string
  avatar?: string
  role?: string
  isActive?: boolean
  gender?: string
  dateOfBirth?: number
  customerId?: string
  addresses?: any[]
  createdAt?: number
  updatedAt?: string
}

export interface ICustomerDetail {
  customerDetail: ICustomer | null
  isShowCustomerDetail: boolean
}

const initialState: ICustomerDetail = {
  customerDetail: null,
  isShowCustomerDetail: false
}

const customerStore = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    setCustomerDetail: (state, action: PayloadAction<ICustomer>) => {
      state.customerDetail = action.payload
    },
    setShowCustomerDetail: (state, action: PayloadAction<boolean>) => {
      state.isShowCustomerDetail = action.payload
    }
  }
})

export const { setCustomerDetail, setShowCustomerDetail } = customerStore.actions

export const customerReducer = customerStore.reducer