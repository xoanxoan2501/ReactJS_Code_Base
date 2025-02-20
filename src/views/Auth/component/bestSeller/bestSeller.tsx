import { useProducts } from '@/shared/hook/useProducts'
import CardProduct from '../../pages/Product/cardProduct'
import './bestSeller.css'
function BestSeller() {
  const { data, isLoading, isError } = useProducts({ limit: 4 })

  if (isLoading) return <p>Loading ...</p>
  if (isError) return <p>Error ...</p>

  const products = data?.data || []
  return (
    <div>
      <h1> Sản phẩm nổi bật</h1>
      <div className="product-grid">
        {products
          ?.slice(0, 4)
          .map((product: any) => (
            <CardProduct key={product._id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default BestSeller
