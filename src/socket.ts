// * Socket.io
import { io } from 'socket.io-client'
import { API_ROOT } from '@/utils/constants.ts'
export const socketIoInstance = io(API_ROOT.replace('/api/v1', ''))
