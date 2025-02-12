import React, { useEffect } from 'react'
import { matchPath, Routes, useLocation } from 'react-router-dom'

import DefaultLayout from '@/layout/index'
import authPresenter from '@/modules/authentication/presenter'
import { privatePage } from '@/routers/mainRouter'
import { useSingleAsync } from '@/shared/hook/useAsync'

import useRouter from './useRouter'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import AdminLayout from '@/layout/AdminLayout'
import { routerLogin } from '@/views/Auth/pages/Login/router'

const PrivatePage: React.FC = () => {
  const token = useAppSelector((state) => state.profile.accessToken)
  const location = useLocation()
  const getProfile = useSingleAsync(authPresenter.getProfile)

  useEffect(() => {
    if (token) {
      getProfile.execute()
    } else {
      window.location.href = routerLogin.path
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const { views, routes } = useRouter({
    routers: privatePage,
    privateRoute: true
  })

  const showAdminLayout = React.useMemo(() => {
    const r = routes.find(
      (it) => it.path && matchPath(it.path, location.pathname)
    )

    return r?.adminLayout
  }, [location.pathname, routes])

  return (
    <>
      {showAdminLayout ? (
        <AdminLayout>
          <Routes>{views}</Routes>
        </AdminLayout>
      ) : (
        <DefaultLayout loading={getProfile.status !== 'ready'}>
          <Routes>{views}</Routes>
        </DefaultLayout>
      )}
    </>
  )
}
export default React.memo(PrivatePage)
