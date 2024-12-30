import { Avatar, Dropdown, Space } from 'antd'
import { LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import './Header.scss'
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
    label: 'Profile'
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

const Header = () => {
  return (
    <header className="header">
      <div>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  )
}

export default Header
