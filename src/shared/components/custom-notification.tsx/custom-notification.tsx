import { Badge, IconButton, Popover, SxProps, Theme, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { OverridableStringUnion } from '@mui/types'
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon'
import notificationIcon from '@/assets/icons/notificationIcon.png'
import { Box } from '@mui/system'
import { useCallback, useMemo, useState } from 'react'

interface CustomNotificationProps {
  notificationCount?: number
  fontSize?: OverridableStringUnion<'small' | 'large' | 'inherit' | 'medium', SvgIconPropsSizeOverrides> | undefined
  sx?: SxProps<Theme> | undefined
  style?: React.CSSProperties | undefined
}

const CustomNotification = ({ notificationCount = 0, fontSize, sx, style }: CustomNotificationProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const open = Boolean(anchorEl)
  const id = useMemo(() => (open ? 'notification-popover' : undefined), [open])

  return (
    <>
      <IconButton color='inherit' sx={{ ...sx }} onClick={handleClick}>
        <Badge
          badgeContent={notificationCount}
          color='error'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '12px', // Adjust font size
              padding: '0 4px', // Adjust padding
              transform: 'translate(50%, -30%)' // Adjust position
            }
          }}
        >
          <img src={notificationIcon} alt='cart' className='icon_hover' style={{ ...style }} />
        </Badge>
      </IconButton>
      {/* Popover hiển thị danh sách thông báo */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
            Thông báo
          </Typography>
          {notificationCount > 0 ? (
            Array.from({ length: notificationCount }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #ddd',
                  padding: '8px 0'
                }}
              >
                <img src={notificationIcon} alt='notification' style={{ width: 24, height: 24, marginRight: 8 }} />
                <Box>
                  <Typography variant='body2'>Đơn hàng của bạn đang được vận chuyển</Typography>
                  <Typography variant='body2' fontWeight='bold'>
                    Mã đơn hàng: DH000{index + 1}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant='body2' sx={{ textAlign: 'center', mt: 1 }}>
              Không có thông báo nào
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  )
}

export default CustomNotification
