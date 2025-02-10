import { Card } from 'antd'
import './Homepage.scss'
import { useAppSelector } from '@/shared/hook/reduxHooks'

function Home() {
  const userLogin = useAppSelector((state) => state.profile.user)

  return (
    <div className="home__container">
      <Card title="Home" className="home__card">
        <h1>Home page</h1>
        <p>Chào mừng bạn đến với trang Home!</p>
        <p>
          {userLogin
            ? `Xin chào ${userLogin.displayName}`
            : 'Bạn chưa đăng nhập'}
        </p>
      </Card>
    </div>
  )
}

export default Home
