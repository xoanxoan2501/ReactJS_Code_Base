import { Breadcrumbs, Link, SxProps, Theme, Typography } from '@mui/material'

interface CustomBreadcrumbsProps {
  breadcrumbItems: Array<{
    label: string
    href?: string
  }>
  sx?: SxProps<Theme> | undefined
  sxItem?: SxProps<Theme> | undefined
}

const CustomBreadcrumbs = ({ breadcrumbItems, sx, sxItem }: CustomBreadcrumbsProps) => {
  const renderBreadcrumbItems = () => {
    return breadcrumbItems.map((item, index) => {
      if (item.href) {
        return (
          <Typography sx={{ ...sxItem }} variant='h6' key={index}>
            <Link underline='hover' color='inherit' href={item.href}>
              {item.label}
            </Link>
          </Typography>
        )
      }

      return (
        <Typography sx={{ ...sxItem }} key={index} variant='h6'>
          {item.label}
        </Typography>
      )
    })
  }

  return (
    <Breadcrumbs separator='>>' sx={{ ...sx }} aria-label='breadcrumb'>
      {renderBreadcrumbItems()}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
