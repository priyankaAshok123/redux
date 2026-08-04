import React, { useEffect, useState, type FC } from 'react'
import ProductCard from './ProductCard'
import { products } from '../../constant';
import "./Cart.css"

interface ProductListProps {
  setCartCount: (value: number | ((prev: number) => number)) => void;
  setCartItems: any,
  openModal: any,
  cartItems: any,
  setOpenModal: any
}


const ProductList: FC<ProductListProps> = ({ setCartCount, setCartItems, cartItems, openModal, setOpenModal }) => {
  const [openCanvas, setOpenCanvas] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>()

  useEffect(() => {
    if (openCanvas) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [openCanvas, openModal])

  return (
    <div className='cardWrapper'>
      {(openCanvas || openModal) && <div className='backdropp' onClick={() => (openCanvas ? setOpenCanvas(false) : setOpenModal(false))}></div>}
      {
        products?.map((item: any, index: number) => (
          <ProductCard cartItems={cartItems} setCartCount={setCartCount} item={item} key={index} setOpenCanvas={setOpenCanvas} setCartItems={setCartItems} />
        ))
      }
      {openCanvas && <div className='canvas'>
        <div>
          <p>{selectedProduct?.image}</p>
          <button onClick={() => setOpenCanvas(false)}>x</button>
        </div>
      </div>}

      {
        openModal && <div className='modal'>
          {cartItems?.map((item) => (
            <div>
              <p>{item?.name}</p>
              <p>{item?.quantity}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default ProductList