import { createSlice } from '@reduxjs/toolkit'

interface InitialStateProps {
  isModalOpening: boolean
  content: string
}

const initialState: InitialStateProps = {
  isModalOpening: false,
  content: ''
}

const productManagementStore = createSlice({
  name: 'productManagement',
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

export const { openModal, closeModal } = productManagementStore.actions

export const productManagementReducer = productManagementStore.reducer
