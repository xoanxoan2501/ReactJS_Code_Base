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
