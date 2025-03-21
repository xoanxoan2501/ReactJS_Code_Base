import './Homepage.scss'
import MySlider from '../Auth/component/slider/slider'
import { Box } from '@mui/material'
import BestSeller from '../Auth/component/bestSeller/bestSeller'
import ContractHome from '../Auth/component/ContractHome/ContractHome'

import ProductHome from '../Auth/component/ProductHome/ProductHome'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import CustomDialogShowProduct from '@/shared/components/custom-dialog-show-product/CustomDialog'
import ProductDetails from '../Auth/pages/ProductDetails/ProductDetails'

function Home() {
  const { productDetail, isShowProductDetail } = useAppSelector((state) => state.prduct)

  return (
    <div className='home__container'>
      <Box sx={{ marginTop: '2rem' }}>
        <MySlider />
        <div className='line_home'> </div>
        <BestSeller />
        <div className='line_home'> </div>

        <ProductHome />
        <div className='line_home'> </div>
        <ContractHome />
      </Box>
    </div>
  )
}

export default Home
