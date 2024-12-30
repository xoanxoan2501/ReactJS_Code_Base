import { Flex, Spin } from 'antd'

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4
}

const content = <div style={contentStyle} />

const Loading = ({ message = 'Loading...' }: { message?: string }) => (
  <Flex gap="middle" style={{ margin: '0 auto', width: '100%' }}>
    <Spin tip={message}>{content}</Spin>
  </Flex>
)

export default Loading
