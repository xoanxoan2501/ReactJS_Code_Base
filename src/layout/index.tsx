import { PropsWithChildren } from 'react'
import Header from '@/layout/header'
import Footer from '@/layout/footer'
import SideBar from '@/layout/sideBar'

interface IDefaultLayoutProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history?: any
  showSideBar?: boolean
  showHeader?: boolean
  loading?: boolean
}

const DefaultLayout: React.FC<PropsWithChildren<IDefaultLayoutProps>> = (
  props
) => {
  return (
    <div className="app__container">
      {props.showHeader && <Header />}
      <div className="app__content">
        {props.showSideBar && <SideBar />}
        <div className="app__main">
          {props.loading ? (
            <div className="app__loading">Loading...</div>
          ) : (
            props.children
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
