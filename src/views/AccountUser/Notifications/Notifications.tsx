import { LayoutBox } from '../../Profile/components/LayoutBox'
import { Box, Button, ButtonBase, Paper, Tab, Tabs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { ReactElement, useState } from 'react'
import './notifications.css'
import iconShip from '@/assets/icons/iconShip.png'
import iconTick from '@/assets/icons/iconTick.png'
import iconVoucher from '@/assets/icons/iconVoucher.png'

const notifications = [
  {
    icon: <img src={iconTick} style={{
      color: "#3b82f6",
      fontSize: 30,
      padding: 15,
      borderRadius: "50%",
      width: 70,
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#dbeafe"
    }}/>,
    title: "Giao kiện hàng thành công",
    description: "Kiện hàng SPW001 đã được giao thành công tới bạn.",
    type: "order"
  },
  {
    icon: <img src={iconShip} style={{
      color: "#3b82f6",
      padding: 15,
      borderRadius: "50%",
      width: 70,
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#dbeafe"
    }}/>,
    title: "Xác nhận đơn hàng",
    description: "Kiện hàng SPW001 đã được xác nhận.",
    type: "order"
  },
  {
    icon: <img src={iconVoucher} style={{
      width: 70,
      height: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}/>,
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
    if (selectedTab === 0) return true
    if (selectedTab === 1) return item.type === "order"
    if (selectedTab === 2) return item.type === "voucher"
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

        <Box sx={{ mt: 3, maxHeight: "470px", overflowY: "auto", pr: "5px",
          mr: "-8px",
          "&::-webkit-scrollbar": {
            width: "6px"
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#d1d1d1",
            borderRadius: "6px"
          } }}>
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
              <Typography sx={{ fontSize: "30px", fontWeight: "400", color: "#000",
                "&:hover": {
                  color: "#E87091"
                } }}>
                  Xem chi tiết
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </LayoutBox>
  )
}

export default Notifications
