import React, { useEffect } from 'react'
import { matchPath, Routes, useLocation } from 'react-router-dom'

import DefaultLayout from '@/layout/user/index'
import { privatePage } from '@/routers/mainRouter'

import useRouter from './useRouter'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import AdminLayout from '@/layout/admin/AdminLayout'
import { routerLogin } from '@/views/user/Auth/pages/Login/router'

const PrivatePage: React.FC = () => {
  const token = useAppSelector((state) => state.profile.accessToken)
  const location = useLocation()

  useEffect(() => {
    if (!token) {
      window.location.href = routerLogin.path
    }
  }, [token])

  const { views, routes } = useRouter({
    routers: privatePage,
    privateRoute: true
  })

  const showAdminLayout = React.useMemo(() => {
    const r = routes.find((it) => it.path && matchPath(it.path, location.pathname))

    return r?.adminLayout
  }, [location.pathname, routes])

  const showDefaultLayout = React.useMemo(() => {
    const r = routes.find((it) => it.path && matchPath(it.path, location.pathname))

    return r?.masterLayout
  }, [location.pathname, routes])

  const showSideBar = React.useMemo(() => {
    const r = routes.find((it) => it.path && matchPath(it.path, location.pathname))

    return r?.showSideBar
  }, [location.pathname, routes])

  return (
    <>
      {showAdminLayout ? (
        <AdminLayout>
          <Routes>{views}</Routes>
        </AdminLayout>
      ) : (
        <DefaultLayout showHeader={showDefaultLayout} showSideBar={showSideBar} showFooter={showDefaultLayout}>
          <Routes>{views}</Routes>
        </DefaultLayout>
      )}
    </>
  )
}
export default React.memo(PrivatePage)
