import { Avatar, Dropdown, Space } from 'antd'
import { LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import authenticationPresenter from '@/modules/authentication/presenter'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'My Account',
    disabled: true
  },
  {
    type: 'divider'
  },
  {
    key: '2',
    label: 'Profile',
    icon: <UserOutlined />
  },
  {
    key: '4',
    label: 'Settings',
    icon: <SettingOutlined />
  },
  {
    key: '5',
    label: 'Logout',
    icon: <LoginOutlined />,
    onClick: () => authenticationPresenter.logOutAuth()
  }
]

export const UserAvatar = () => {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar
            icon={<UserOutlined />}
            style={{
              cursor: 'pointer',
              width: '40px',
              height: '40px'
            }}
          />
        </Space>
      </a>
    </Dropdown>
  )
}
