import './Homepage.scss'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import MySlider from '../Auth/component/slider/slider'
import { Container } from '@mui/material'
import BestSeller from '../Auth/component/bestSeller/bestSeller'
import ContractHome from '../Auth/component/ContractHome/ContractHome'

import ProductHome from '../Auth/component/ProductHome/ProductHome'

function Home() {
  const userLogin = useAppSelector((state) => state.profile.user)

  return (
    <div className="home__container">
      <Container>
        <MySlider />
        <div className="line_home"> </div>
        <BestSeller />
        <div className="line_home"> </div>

        <ProductHome />
        <div className="line_home"> </div>
        <ContractHome />
      </Container>
    </div>
  )
}

export default Home
