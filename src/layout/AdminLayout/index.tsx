import React, { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <header className="admin__header">Admin Header</header>
      <main className="admin__content">{children}</main>
      <footer className="admin__footer">Admin Footer</footer>
    </>
  )
}

export default AdminLayout
