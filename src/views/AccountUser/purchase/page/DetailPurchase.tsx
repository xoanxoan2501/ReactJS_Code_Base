import { LayoutBox } from '@/views/Profile/components/LayoutBox'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import './DetailPurchase.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Typography } from '@mui/material'
import TableProductOrder from '../component/tableProductOrder'
import { Link } from 'react-router-dom'
import { routerPurchase } from '../router'
function DetailPurchase() {
  return (
    <LayoutBox>
      <div className='container-order11'>
        <Link to={routerPurchase.path}>
          <div className='back-icons'>
            <KeyboardBackspaceIcon sx={{ fontSize: '30px', color: '#DC567A' }} />
          </div>
        </Link>
        <Typography className='typograpy-detals'>Chi tiết đơn hàng : #DD1111222</Typography>
        <LocalShippingIcon sx={{ color: '#DC567A', fontSize: '50px' }} />
      </div>

      <span className='span-details'> Ngày đặt hàng: 25/02/2025</span>
      <div className='info-purcharse'>
        <div className='info-info'>
          <Typography> TRAN THI MY XOAN</Typography>
          <Typography> DIA CHI : 37 DUONG SO 9, BINH THO, THU DUC</Typography>
          <Typography> SO DIEN THOAI: 0909 0909 0909 </Typography>
        </div>
        <div className='info-info'>
          <Typography> HINH THUC GIAO HANG : LAY TAI QUAN</Typography>
          <Typography>HINH THUC THANH TOAN : CHUYEN KHOAN</Typography>
        </div>
      </div>

      <TableProductOrder />
    </LayoutBox>
  )
}

export default DetailPurchase
