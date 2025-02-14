import { Card } from '@mui/material'
import CardProduct from '../../pages/Product/cardProduct'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import './RandomProduct.css'
function RandomProduct() {
  return (
    <div>
      <div className="product_random">
        <div className="Random_1">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
        <div className="banner">
          <Card className="banner_customer">
            <CardActionArea>
              <CardMedia
                component="img"
                height="500px"
                image="./img/product_banner.jpg"
                alt="green iguana"
              />
              <CardContent className="card_text">
                <Typography gutterBottom variant="h5" component="div">
                  Napun bakery
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default RandomProduct
