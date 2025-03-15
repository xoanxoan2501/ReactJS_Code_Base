import { routerHome } from '@/views/user/home/router'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px'
      }}
    >
      <h1>Error!</h1>
      <Link to={routerHome.path}>
        <Button>Go back to home</Button>
      </Link>
    </div>
  )
}

export default ErrorPage
