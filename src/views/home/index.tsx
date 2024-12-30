import { Card } from 'antd'
import './Homepage.scss'
import { useAppSelector } from '@/shared/hook/reduxHooks'

function Home() {
  const userLogin = useAppSelector((state) => state.profile.user)

  return (
    <div className="home__container">
      <Card className="user__card" title="User Detail">
        <p>email: {userLogin?.email}</p>
        <p>username: {userLogin?.username}</p>
        <p>name: {userLogin?.name}</p>
        <p>phoneNumber: {userLogin?.phoneNumber}</p>
        <p>dayOfBirth: {userLogin?.dayOfBirth}</p>
      </Card>
    </div>
  )
}

export default Home
