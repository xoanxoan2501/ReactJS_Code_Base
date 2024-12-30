import React, { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <header className="admin__header">Admin Header</header>
      <div className="admin__content">{children}</div>
      <footer className="admin__footer">Admin Footer</footer>
    </>
  )
}

export default AdminLayout
