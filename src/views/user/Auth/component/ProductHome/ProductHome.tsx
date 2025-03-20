import { useState } from 'react'
import { Button } from '@mui/material'
import RandomProduct from '../RandomProduct/RandomProduct'
import RandomProduct2 from '../RandomProduct/RandomProduct2'

function ProductHome() {
  // State cho nhóm 1
  const [selectedCategory1, setSelectedCategory1] = useState('Tất cả')
  // State cho nhóm 2
  const [selectedCategory2, setSelectedCategory2] = useState('Tất cả')

  return (
    <div>
      {/* Nhóm 1 */}
      <div>
        <h1>Bánh kem</h1>
        <div>
          {['Tất cả', 'Gato kem', 'Gato kem tươi', 'Bánh cưới'].map((item) => (
            <Button
              key={item}
              onClick={() => setSelectedCategory1(item)}
              sx={{
                backgroundColor:
                  selectedCategory1 === item ? '#DC567A' : 'transparent',
                color: selectedCategory1 === item ? 'white' : 'black',
                borderRadius: '15px',
                border: '1px solid #F2C2CF',
                '&:hover': {
                  backgroundColor: '#F2C2CF',
                  color: 'white'
                },
                margin: '5px'
              }}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* Hiển thị component tương ứng cho nhóm 1 */}
        {selectedCategory1 === 'Tất cả' ||
        selectedCategory1 === 'Gato kem tươi' ? (
            <RandomProduct />
          ) : (
            <RandomProduct2 />
          )}
      </div>

      <div className="line_home"> </div>
      <div>
        <h1>Bánh kem</h1>
        <div>
          {['Tất cả', 'Bánh mouse', 'Bánh cưới', 'Bánh mặn'].map((item) => (
            <Button
              key={item}
              onClick={() => setSelectedCategory2(item)}
              sx={{
                backgroundColor:
                  selectedCategory2 === item ? '#DC567A' : 'transparent',
                color: selectedCategory2 === item ? 'white' : 'black',
                borderRadius: '15px',
                border: '1px solid #F2C2CF',
                '&:hover': {
                  backgroundColor: '#F2C2CF',
                  color: 'white'
                },
                margin: '5px'
              }}
            >
              {item}
            </Button>
          ))}
        </div>

        {/* Hiển thị component tương ứng cho nhóm 2 */}
        {selectedCategory2 === 'Tất cả' || selectedCategory2 === 'Bánh cưới' ? (
          <RandomProduct2 />
        ) : (
          <RandomProduct />
        )}
      </div>
    </div>
  )
}

export default ProductHome
