import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Typography, Grid, Stack } from '@mui/material'
import { Skeleton } from 'antd'
import { Delete, Image } from '@mui/icons-material'
import VoucherManagementLayout from './layout'
import TextFieldCustom from './TextFieldCustom'
import SelectCustom from './SelectCustom'
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { routerAddVoucher, routerVoucherManagement } from './router'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Voucher, VoucherSchema } from './FormZod'
import { toast } from 'react-toastify'
import { useCategoryInfo } from '@/apis/category/use-category-info'
import { useAddProduct } from '@/apis/product/use-add-product'
import { useUpdateProduct } from '@/apis/product/use-update-product'
import { useGetAllProducts } from '@/apis/product/use-get-all-product'

const color = {
  deepBlue: '#086191'
}

export default function FormVoucher() {

  return (
    <VoucherManagementLayout>
      <Box p={2} bgcolor='#e5f5ff' borderRadius={2}>
        {/* Title */}

      </Box>
    </VoucherManagementLayout>
  )
}
