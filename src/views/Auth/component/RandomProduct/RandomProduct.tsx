import { Card } from '@mui/material'
import CardProduct from '../../pages/Product/cardProduct'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import './RandomProduct.css'
import { IProduct } from '@/apis/product'
import { useProducts } from '@/shared/hook/useProducts'
function RandomProduct() {
  const { data, isLoading, isError } = useProducts({ limit: 6 })
  const products: IProduct[] = (data?.data || []).slice(0, 6)
  if (isLoading) return <p>Loading ...</p>
  if (isError) return <p>Error ... </p>

  return (
    <div>
      <div className="product_random">
        <div className="Random_1">
          {products.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
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
