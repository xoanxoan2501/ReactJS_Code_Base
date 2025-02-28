import { Box, Typography } from '@mui/material'
import { LayoutBox } from '../../Profile/components/LayoutBox'
import './Address.css'
import CheckIcon from '@mui/icons-material/Check'
import { useAppSelector } from '@/shared/hook/reduxHooks'

function Address() {
  const user = useAppSelector((state) => state.profile.user)
  console.log(user)
  return (
    <LayoutBox>
      <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>Thông tin địa chỉ giao hàng </h3>
      <Box sx={{ maxHeight: '470px', overflowY: 'auto', padding: '10px' }}>
        <div className='content-address'>
          <div>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography className='typography-address'>{user?.fullname}</Typography>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '10px' }}>
                <div className='icon-check'>
                  <CheckIcon style={{ color: '#DC567A' }} />
                </div>
                <Typography sx={{ color: '#DC567A' }}>Địa chỉ mặc định</Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography className='typography-addresss'>Địa chỉ : </Typography>
              <Typography className='typography-address2'>
                {user?.address},{user?.district} , {user?.province}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Typography className='typography-addresss'>Số điện thoại: </Typography>
              <Typography className='typography-address2'>{user?.phoneNumber}</Typography>
            </Box>
          </div>
          <div className='edit-address'>
            <Typography className='address-edit'>Chỉnh sửa </Typography>
          </div>
        </div>

        {user?.addresses?.map((addr, index) => (
          <div className='content-address' key={index}>
            <div>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Typography className='typography-address'>{addr.fullname}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Typography className='typography-addresss'>Địa chỉ:</Typography>
                <Typography className='typography-address2'>
                  {addr.address}, {addr.district}, {addr.province}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Typography className='typography-addresss'>Số điện thoại:</Typography>
                <Typography className='typography-address2'>{addr.phoneNumber}</Typography>
              </Box>
            </div>
            <div className='edit-address'>
              <Typography className='address-edit'>Chỉnh sửa</Typography>
            </div>
          </div>
        ))}
      </Box>
      <div>
        <button className='add-address'> + Thêm địa chỉ mới</button>
      </div>
    </LayoutBox>
  )
}

export default Address
