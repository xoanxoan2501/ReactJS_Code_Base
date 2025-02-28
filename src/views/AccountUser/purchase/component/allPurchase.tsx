import { Box, Typography } from '@mui/material'
import '../Purchase.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CancelIcon from '@mui/icons-material/Cancel'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { routerDetailPurchase } from '../page/router'
function AllPurchase() {
  return (
    <Box sx={{ maxHeight: '470px', overflowY: 'auto', padding: '10px' }}>
      <div className='container-order'>
        <div className='img-container'>
          <img src='./img/banh_mau_hong.jpg' className='img-details' />
          <div className='number-order'>1</div>
        </div>
        <div className='details-container'>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Mousse gree tea </Typography>
          <Typography>Số sản lượng sản phẩm : 1 </Typography>
          <Typography>Tổng tiền : 250000 </Typography>
        </div>
        <div className='button-container'>
          <LocalShippingIcon sx={{ color: '#DC567A', fontSize: '30px' }} />
          <Link to={routerDetailPurchase.path}>
            <Button className='buttonn'>Xem chi tiết</Button>
          </Link>
        </div>
      </div>
      <div className='container-order'>
        <div className='img-container'>
          <img src='./img/banh_mau_hong.jpg' className='img-details' />
          <div className='number-order'>1</div>
        </div>
        <div className='details-container'>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Mousse gree tea </Typography>
          <Typography>Số sản lượng sản phẩm : 1 </Typography>
          <Typography>Tổng tiền : 250000 </Typography>
        </div>
        <div className='button-container'>
          <CancelIcon sx={{ color: '#DC567A', fontSize: '30px' }} />
          <Link to={routerDetailPurchase.path}>
            <Button className='buttonn'>Xem chi tiết</Button>
          </Link>
        </div>
      </div>
      <div className='container-order'>
        <div className='img-container'>
          <img src='./img/banh_mau_hong.jpg' className='img-details' />
          <div className='number-order'>1</div>
        </div>
        <div className='details-container'>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Mousse gree tea </Typography>
          <Typography>Số sản lượng sản phẩm : 1 </Typography>
          <Typography>Tổng tiền : 250000 </Typography>
        </div>
        <div className='button-container'>
          <Button className='buttonn'>mua lại</Button>
          <Link to={routerDetailPurchase.path}>
            <Button className='buttonn'>Xem chi tiết</Button>
          </Link>
        </div>
      </div>
      <div className='container-order'>
        <div className='img-container'>
          <img src='./img/banh_mau_hong.jpg' className='img-details' />
          <div className='number-order'>1</div>
        </div>
        <div className='details-container'>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Mousse gree tea </Typography>
          <Typography>Số sản lượng sản phẩm : 1 </Typography>
          <Typography>Tổng tiền : 250000 </Typography>
        </div>
        <div className='button-container'>
          <LocalShippingIcon sx={{ color: '#DC567A', fontSize: '30px' }} />
          <Link to={routerDetailPurchase.path}>
            <Button className='buttonn'>Xem chi tiết</Button>
          </Link>
        </div>
      </div>
    </Box>
  )
}

export default AllPurchase
