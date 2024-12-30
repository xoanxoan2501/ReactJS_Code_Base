import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '@/core/store/redux'
import { RootState } from '@/modules'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
