import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

export default function CardProduct() {
  return (
    <Card
      sx={{
        maxWidth: '200px',
        maxHeight: '300px',
        borderRadius: '15px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '300px',
        position: 'relative',
        overflow: 'hidden', // Để tránh nội dung vượt ra ngoài
        '&:hover .zoom-content': {
          transform: 'scale(1.05)', // Phóng to nội dung
        },
      }}
    >
      <Box
        className="zoom-content"
        sx={{
          height: '100%',
          width: '100%',
          transition: 'transform 0.3s ease',
          transform: 'scale(1)', // Giá trị mặc định
        }}
      >
        <CardMedia
          sx={{
            height: '200px',
            width: '100%',
            transition: 'all 0.3s ease',
          }}
          image="./img/banh_mau_hong.jpg"
          title="Rose Mouse Cake"
        />
        <CardContent
          sx={{
            textAlign: 'center',
            backgroundColor: 'rgba(242, 194, 207, 0.25)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '60px',
            flex: '1',
          }}
        >
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              Rose Mouse Cake
            </Typography>
            <Typography variant="body2">RM001</Typography>
          </Box>
        </CardContent>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            display: 'flex',
            width: '177px',
            height: '50px',
            borderRadius: '15px 15px 0px 15px',
            backgroundColor: 'rgba(242, 194, 207, 1)',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px',
          }}
        >
          <Typography
            sx={{
              backgroundColor: '#BBEDF2',
              width: '119px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              marginRight: '10px',
            }}
          >
            250.000
          </Typography>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            sx={{
              right: '9px',
            }}
          >
            <AddShoppingCartIcon sx={{ fontSize: '28px' }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}
