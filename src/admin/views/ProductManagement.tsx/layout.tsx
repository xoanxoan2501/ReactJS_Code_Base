import { Stack, Typography } from '@mui/material'

const ProductManagementLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Stack direction={'column'} spacing={3} sx={{ padding: '20px 24px' }}>
      <Stack
        sx={{
          height: '45px',
          backgroundColor: '#08619140',
          borderLeft: '5px solid #086191',
          padding: '0 10px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)'
        }}
        direction={'row'}
        alignItems={'center'}
      >
        <Typography variant="subtitle1">Danh sách sản phẩm</Typography>
      </Stack>
      <Stack
        direction={'column'}
        spacing={2}
        sx={{
          backgroundColor: '#7CCCF840',
          borderRadius: '10px',
          height: '800px',
          padding: '10px 20px'
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default ProductManagementLayout
