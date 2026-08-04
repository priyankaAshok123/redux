import { useState } from 'react'
import Header from './Header'
import ProductList from './ProductList'

const Cart = ({setCartItems, cartItems}) => {
  const [cartCount, setCartCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
        <Header cartCount={cartCount} cartItems={cartItems} setOpenModal={setOpenModal}/>
        <ProductList setCartCount={setCartCount} setCartItems={setCartItems} setOpenModal={setOpenModal} cartItems={cartItems} openModal={openModal}/>
    </div>
  )
}

export default Cart