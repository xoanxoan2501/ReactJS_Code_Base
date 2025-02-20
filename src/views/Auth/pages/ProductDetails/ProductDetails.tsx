import { useState } from 'react'

const ProductDetails = () => {
  const [size, setSize] = useState('15cm')

  const handleSizeChange = (newSize: string) => {
    setSize(newSize)
  }

  return (
    <div className="flex bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col items-center mr-6">
        <img
          src="/img/product.jpg"
          alt="Fruit Cake"
          className="w-64 rounded-lg"
        />
        <div className="flex gap-2 mt-4">
          <img
            src="./img/banh_mau_hong.jpg"
            alt="Thumbnail 1"
            className="w-12 h-12 rounded-md cursor-pointer border-2 border-[#DC567A]"
          />
          <img
            src="./img/banh_mau_hong.jpg"
            alt="Thumbnail 2"
            className="w-12 h-12 rounded-md cursor-pointer border-2 border-transparent"
          />
          <img
            src="./img/banh_mau_hong.jpg"
            alt="Thumbnail 3"
            className="w-12 h-12 rounded-md cursor-pointer border-2 border-transparent"
          />
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">FRUIT CAKE</h1>
        <p className="text-gray-600">Mã sản phẩm: KT017</p>
        <p className="text-lg font-bold text-[#DC567A]">
          Giá: <span className="text-2xl">200.000 đ</span>
        </p>
        <p className="font-medium">Kích thước:</p>
        <div className="flex gap-2">
          {['15cm', '17cm', '20cm', '25cm'].map((item) => (
            <button
              key={item}
              onClick={() => handleSizeChange(item)}
              className={`px-4 py-2 border rounded-md transition ${size === item ? 'bg-[#DC567A] text-white' : 'border-[#DC567A] text-[#DC567A]'}`}
            >
              {item}
            </button>
          ))}
        </div>
        {/* Nút bấm */}
        <div className="flex gap-4 mt-4">
          <button className="bg-[#DC567A] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#b2435c]">
            Thêm vào giỏ hàng
          </button>
          <button className="border border-[#DC567A] text-[#DC567A] px-6 py-2 rounded-lg hover:bg-[#DC567A] hover:text-white">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
