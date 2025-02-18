import iconAdminLogout from '@/assets/icons/iconAdminLogout.png'

const AdminHeader = () => {
  return (
    <header
      className="admin-header"
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
        alt="logo"
        className="icon_hover"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%'
        }}
      />
    </header>
  )
}

export default AdminHeader
