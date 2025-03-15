import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { LayoutBox } from '@/views/user/Profile/components/LayoutBox'
import './Purchase.css'
import AllPurchase from './component/allPurchase'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Purchase() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <LayoutBox>
      <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>Đơn hàng của tôi </h3>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Tất cả' {...a11yProps(0)} />
            <Tab label='Đang giao xử lý' {...a11yProps(1)} />
            <Tab label='Đang giao' {...a11yProps(2)} />
            <Tab label='Đã giao' {...a11yProps(3)} />
            <Tab label='Đã hủy' {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AllPurchase />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllPurchase />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllPurchase />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <AllPurchase />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <AllPurchase />
        </CustomTabPanel>
      </Box>
    </LayoutBox>
  )
}
