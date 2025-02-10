import React, { useEffect } from 'react'
import { matchPath, Routes, useLocation } from 'react-router-dom'
import { publicPage } from '../mainRouter'
import DefaultLayout from '@/layout'
import useRouter from './useRouter'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import { routerHome } from '@/views/home/router'

const PublicPage: React.FC = () => {
  const token = useAppSelector((state) => state.profile.accessToken)
  const location = useLocation()
  const { views, routes } = useRouter({ routers: publicPage })

  useEffect(() => {
    if (token && (location.pathname == '/' || location.pathname == '/login')) {
      window.location.href = routerHome.path
    }
  }, [location.pathname, token])

  const showDefaultLayout = React.useMemo(() => {
    const r = routes.find(
      (it) => it.path && matchPath(it.path, location.pathname)
    )

    return r?.masterLayout
  }, [location.pathname, routes])

  const showSideBar = React.useMemo(() => {
    const r = routes.find(
      (it) => it.path && matchPath(it.path, location.pathname)
    )

    return r?.showSideBar
  }, [location.pathname, routes])

  return (
    <DefaultLayout showHeader={showDefaultLayout} showSideBar={showSideBar}>
      <Routes>{views}</Routes>
    </DefaultLayout>
  )
}

export default React.memo(PublicPage)
