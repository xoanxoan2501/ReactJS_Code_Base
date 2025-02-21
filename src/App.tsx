import PrivatePage from '@/routers/components/PrivatePage'
import PublicPage from '@/routers/components/PublicPage'
import ScrollMemory from '@/ScrollMemory'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import { memo } from 'react'

const MainView = memo(({ statusLogin }: { statusLogin: boolean }) => {
  return <>{statusLogin ? <PrivatePage /> : <PublicPage />}</>
})

function App() {
  const token = useAppSelector((state) => state.profile.accessToken)

  return (
    <>
      <ScrollMemory />
      <MainView statusLogin={!!token && token !== ''} />
    </>
  )
}

export default App
