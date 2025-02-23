import './Homepage.scss'
import MySlider from '../Auth/component/slider/slider'
import { Box, Button } from '@mui/material'
import BestSeller from '../Auth/component/bestSeller/bestSeller'
import ContractHome from '../Auth/component/ContractHome/ContractHome'

import ProductHome from '../Auth/component/ProductHome/ProductHome'
import CustomDialogShowProduct from '@/shared/components/custom-dialog-show-product/CustomDialog'
import { useState } from 'react'

function Home() {
  const [openDialog, setOpenDialog] = useState(false)

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
        <Button variant='contained' onClick={() => setOpenDialog(true)}>
          Mở Dialog
        </Button>
      </Box>
      <CustomDialogShowProduct open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  )
}

export default Home
