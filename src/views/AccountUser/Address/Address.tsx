import { Box, Typography } from '@mui/material'
import { LayoutBox } from '../../Profile/components/LayoutBox'
import './Address.css'
import CheckIcon from '@mui/icons-material/Check'
import { useAppSelector } from '@/shared/hook/reduxHooks'
import CustomBreadcrumbs from '@/shared/components/custom-breadcrumbs/CustomBreadcrumbs'
import { routerAddress } from '@/views/AccountUser/Address/router'
import { useNavigate } from 'react-router-dom'
import { routerCreateAddress, routerEditAddress } from '@/views/AccountUser/Address/Edit/router'

function Address() {
  const user = useAppSelector((state) => state.profile.user)

  const navigate = useNavigate()

  return (
    <LayoutBox>
      <CustomBreadcrumbs
        breadcrumbItems={[
          {
            label: 'Thông tin địa chỉ giao hàng',
            href: routerAddress.generatePath?.()
          }
        ]}
        sx={{ padding: '10px' }}
      />
      <Box sx={{ maxHeight: '570px', overflowY: 'auto', padding: '10px' }}>
        {user?.addresses?.map((addr, index) => (
          <div className='content-address' key={index}>
            <div>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Typography className='typography-address'>{addr.fullname}</Typography>
                {addr.isDefault && (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '10px' }}>
                    <div className='icon-check'>
                      <CheckIcon style={{ color: '#DC567A' }} />
                    </div>
                    <Typography sx={{ color: '#DC567A' }}>Địa chỉ mặc định</Typography>
                  </div>
                )}
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
              <Typography
                onClick={() => {
                  const path = routerEditAddress.generatePath?.(index)
                  if (path) {
                    navigate(path)
                  }
                }}
                className='address-edit'
              >
                Chỉnh sửa
              </Typography>
            </div>
          </div>
        ))}
      </Box>
      <div>
        <button
          onClick={() => {
            const path = routerCreateAddress.generatePath?.()
            if (path) {
              navigate(path)
            }
          }}
          className='add-address'
        >
          {' '}
          + Thêm địa chỉ mới
        </button>
      </div>
    </LayoutBox>
  )
}

export default Address
