import CustomerManagementLayout from '@/views/admin/CustomerManagement/layout'
import { Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import DataGridTable from '@/shared/components/data-grid-table/data-grid-table'
import { headerConfigs } from '@/views/admin/CustomerManagement/headerConfigs'
import { useFetchUsers } from '@/shared/hook/useFetchUsers'
import { GridPaginationModel } from '@mui/x-data-grid'
import { DEFAULT_LIMIT_PER_PAGE } from '@/utils/constants'
import CustomerActions from './CustomerActions'
import CustomerFilter from './CustomerFilter'
import CustomerTable from './CustomerTable'
import { convertLegacyProps } from 'antd/es/button'
import UserEntity from '@/modules/user/entity'

const CustomerManagement = () => {
  return (
    <CustomerManagementLayout>
      <Stack direction={'column'} spacing={2}>
        <CustomerActions/>
        <CustomerFilter/>
        <CustomerTable/>
      </Stack>
    </CustomerManagementLayout>
  )
}

export default CustomerManagement
