/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { API_ROOT } from '@/utils/constants'

const useSocket = <TReceived, TSent>(keyEmit: string, keyReceived: string, onHandle: (data: TReceived) => void) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    console.log('Connecting to Socket.IO server...')
    const socketInstance = io(API_ROOT.replace('/api/v1', ''), { transports: ['websocket'] })

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.IO server')
    })

    socketInstance.on('disconnect', () => {
      console.log('Socket.IO connection closed')
    })

    socketInstance.on(keyReceived, (data: TReceived) => {
      onHandle(data)
    })

    setSocket(socketInstance)

    return () => {
      console.log('Closing Socket.IO connection...')
      socketInstance.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendData = (data: TSent) => {
    if (!socket) {
      console.warn('Socket.IO is not connected. Cannot send data.')
      return
    }
    socket.emit(keyEmit, data)
  }

  return { sendData }
}

export default useSocket
