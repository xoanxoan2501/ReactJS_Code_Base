import { PropsWithChildren } from 'react'
import Header from '@/layout/header'
import Footer from '@/layout/footer'
import SideBar from '@/layout/sideBar'
import { Stack } from '@mui/material'

interface IDefaultLayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history?: any
  showSideBar?: boolean
  showHeader?: boolean
  showFooter?: boolean
  loading?: boolean
}

const DefaultLayout: React.FC<PropsWithChildren<IDefaultLayoutProps>> = (
  props
) => {
  return (
    <div className="app__container">
      {props.showHeader && <Header />}
      <div className="app__content container">
        <Stack direction={'row'} spacing={2}>
          {props.showSideBar && <SideBar />}
          <div
            style={{
              width: props.showSideBar ? '80%' : '100%'
            }}
            className="app__main"
          >
            {props.loading ? (
              <div className="app__loading">Loading...</div>
            ) : (
              props.children
            )}
          </div>
        </Stack>
      </div>
      {props.showFooter && <Footer />}
    </div>
  )
}

export default DefaultLayout
