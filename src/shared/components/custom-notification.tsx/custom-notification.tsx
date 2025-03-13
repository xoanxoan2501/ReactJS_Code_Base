import { Badge, IconButton, SxProps, Theme } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { OverridableStringUnion } from '@mui/types'
import { SvgIconPropsSizeOverrides } from '@mui/material/SvgIcon'

interface CustomNotificationProps {
  notificationCount?: number
  fontSize?: OverridableStringUnion<'small' | 'large' | 'inherit' | 'medium', SvgIconPropsSizeOverrides> | undefined
  sx?: SxProps<Theme> | undefined
}

const CustomNotification = ({ notificationCount = 0, fontSize, sx }: CustomNotificationProps) => {
  return (
    <IconButton color='inherit'>
      <Badge badgeContent={notificationCount} color='error'>
        <NotificationsIcon fontSize={fontSize} sx={{ ...sx }} />
      </Badge>
    </IconButton>
  )
}

export default CustomNotification
