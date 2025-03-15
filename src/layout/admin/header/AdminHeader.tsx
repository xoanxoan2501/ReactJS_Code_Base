import { routerAdminLogin } from '@/views/admin/login/router'
import { logoutAPI } from '@/apis/auth'
import iconAdminLogout from '@/assets/icons/iconAdminLogout.png'
import { useAppDispatch } from '@/shared/hook/reduxHooks'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutAPI())
      .unwrap()
      .then(() => navigate(routerAdminLogin.path))
  }

  return (
    <header
      className='admin-header'
      style={{
        height: '50px',
        backgroundColor: '#086191',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0 20px'
      }}
    >
      <img
        src={iconAdminLogout}
        alt='logo'
        className='icon_hover'
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%'
        }}
        onClick={handleLogout}
      />
    </header>
  )
}

export default AdminHeader
