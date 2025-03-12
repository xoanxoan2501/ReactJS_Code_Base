import { LayoutBox } from '../../Profile/components/LayoutBox'
import { Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { routerDetailPurchase } from '../purchase/page/router'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import FireIcon from "@mui/icons-material/Whatshot"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import React, { ReactElement, useState } from 'react'
import './notifications.css'

const notifications = [
  {
    icon: <CheckCircleIcon sx={{ color: "#3b82f6", fontSize: 40 }} />,
    title: "Giao kiện hàng thành công",
    description: "Kiện hàng SPW001 đã được giao thành công tới bạn.",
    type: "order"
  },
  {
    icon: <LocalShippingIcon sx={{ color: "#c084fc", fontSize: 40 }} />,
    title: "Xác nhận đơn hàng",
    description: "Kiện hàng SPW001 đã được xác nhận.",
    type: "order"
  },
  {
    icon: <LocalOfferIcon sx={{ color: "#ec4899", fontSize: 40 }} />,
    title: "SIÊU HOT! MÃ GIẢM 200K SẴN SÀNG",
    description: (
      <>
        <Typography>🔥 Thêm mã giảm 200k chỉ có hôm nay!</Typography>
        <Typography>🛒 Freeship tận nơi - mua sắm ngay</Typography>
      </>
    ),
    type: "voucher"
  }
]

function Notifications() {
  const [selectedTab, setSelectedTab] = useState(0) // 0: Tất cả, 1: Đơn hàng, 2: Mã giảm giá

  // Hàm xử lý khi đổi tab
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  // Lọc thông báo theo tab được chọn
  const filteredNotifications = notifications.filter((item) => {
    if (selectedTab === 0) return true // Tất cả
    if (selectedTab === 1) return item.type === "order"// Chỉ đơn hàng
    if (selectedTab === 2) return item.type === "voucher" // Chỉ mã giảm giá
    return false
  })

  return (
    <LayoutBox sx={{ background: "#f8cfd3" }}>
      <Box sx={{ backgroundColor: "#f8cfd3", p: 3, borderRadius: 2, maxWidth: "100%", mx: "auto", mt: 4, padding: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2, textAlign: "center", fontSize: "30px" }}>
          Thông báo
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
          <Tabs value={selectedTab} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
            <Tab label="Tất cả" sx={{ fontWeight: "bold", color: "#000", fontSize: "20px" }} />
            <Tab label="Đơn hàng" sx={{ fontWeight: "bold", color: "#000", fontSize: "20px" }}/>
            <Tab label="Mã giảm giá" sx={{ fontWeight: "bold", color: "#000", fontSize: "20px" }}/>
          </Tabs>
        </Box>

        <Box sx={{ mt: 3 }}>
          {filteredNotifications.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", p: 2, backgroundColor: "#fff", borderRadius: 2, mb: 3, border: "1px solid #f1a4b5", padding: "30px" }}>
              <Box sx={{ mr: 2 }}>{item.icon}</Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>{item.title}</Typography>
                {typeof item.description === "string" ? (
                  <Typography variant="body2" sx={{ fontSize: "20px" }}>{item.description}</Typography>
                ) : (
                  React.Children.map(item.description.props.children, (child, i) => (
                    <div className='typograph-des'>
                      <Typography key={i} variant="body2" sx={{ fontSize: "20px" }}>
                        {child}
                      </Typography>
                    </div>
                  ))
                )}
              </Box>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>Xem chi tiết</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </LayoutBox>
  )
}

export default Notifications
