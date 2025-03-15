import { createSlice } from '@reduxjs/toolkit'

export interface InitialStateProps {
  isModalOpening: boolean
  content: Content
}

interface Content {
  id: string
  name: string
}

const initialState: InitialStateProps = {
  isModalOpening: false,
  content: {
    id: '',
    name: ''
  }
}

const orderManagementStore = createSlice({
  name: 'orderManagement',
  initialState: initialState,
  reducers: {
    openModal: (state, payload) => {
      state.isModalOpening = true
      state.content = payload.payload
    },
    closeModal: (state) => {
      state.isModalOpening = false
    }
  }
})

export const { openModal, closeModal } = orderManagementStore.actions

export const orderManagementReducer = orderManagementStore.reducer
