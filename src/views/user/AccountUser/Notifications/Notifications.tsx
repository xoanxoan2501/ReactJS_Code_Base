import useSocket from '@/shared/hook/useSocket'
import { LayoutBox } from '../../Profile/components/LayoutBox'
import { API_ROOT } from '@/utils/constants'

function Notifications() {
  // Sử dụng useSocket để kết nối đến WebSocket Server
  const { sendData } = useSocket<{ content: string }, { text: string }>('fe-message', 'be-message', (data) => {
    console.log('📩 Received message from server:', data)
  })
  return (
    <LayoutBox>
      <h2>🛰 WebSocket Test</h2>
      <button onClick={() => sendData({ text: 'Hello from client!' })}>Send Message</button>
    </LayoutBox>
  )
}

export default Notifications
