import { Box } from '@mui/material'
import { Flex, Spin } from 'antd'

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4
}

const content = <div style={contentStyle} />

const Loading = ({ message = 'Loading...' }: { message?: string }) => (
  <Box
    sx={{
      width: '100%',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Flex gap="middle">
      <Spin tip={message}>{content}</Spin>
    </Flex>
  </Box>
)

export default Loading
