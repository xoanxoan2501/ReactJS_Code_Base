import OrderManagementLayout from '@/views/admin/OrderManagement/layout'
import { Stack } from '@mui/material'
import OrderTable from './OrderTable'
import OrderActions from './OrderActions'
import OrderFilter from './OrderFilter'
import OrderStatusCategory from './OrderStatusCategory'

const OrderManagement = () => {
  return (
    <OrderManagementLayout>
      <Stack direction={'column'} spacing={2}>
        <OrderStatusCategory />
        <OrderFilter />
        <OrderTable />
      </Stack>
    </OrderManagementLayout>
  )
}

export default OrderManagement
