import React from 'react'
import CardProduct from '../../pages/Product/cardProduct'
import './bestSeller.css'
function BestSeller() {
  return (
    <div>
      <h1> Sản phẩm nổi bật</h1>
      <div className="product-grid">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </div>
  )
}

export default BestSeller
