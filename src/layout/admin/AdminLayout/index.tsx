import AdminHeader from '@/layout/admin/header/AdminHeader'
import AdminSideBar from '@/layout/admin/SideBar/AdminSideBar'
import { Stack } from '@mui/material'
import React, { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Stack direction={'row'}>
      <Stack sx={{ flex: 1 }}>
        <AdminSideBar />
      </Stack>
      <Stack sx={{ flex: 4.8 }}>
        <AdminHeader />
        <main className='admin__content'>{children}</main>
      </Stack>
    </Stack>
  )
}

export default AdminLayout
