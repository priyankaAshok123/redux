import React, { useState, type FC } from 'react'
import "./Cart.css";
import { products } from "../../constant";

export interface itemType {
  name: string,
  price: number,
  image: string,
  id: number,
  quantity: number,
  stock: number
}

interface ProductCardProps {
  setCartCount: (value: number | ((prev: number) => number)) => void;
  item: itemType,
  setOpenCanvas: any,
  cartItems:any
  setCartItems:any
}

const ProductCard: FC<ProductCardProps> = ({ setCartCount, item, setOpenCanvas, cartItems, setCartItems }) => {
  // const [updateQuantity, setUpdateQuantity] = useState(0);
  const cartItem = cartItems.find(
    (cartItem: itemType) => cartItem.id === item.id
  );

  const quantity = cartItem?.quantity || 0;
  const isAddedToCart = quantity > 0;
  const updateCart = () => {
    setCartCount((prev: number) => prev + 1);
    // setUpdateQuantity(1)
    setCartItems((prev:any) => [...prev, {...item, quantity : 1}])
  }

const onIncre = (type: string) => {
  if (type === "dec") {
    setCartItems((prev: itemType[]) =>
      prev.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );

    setCartCount((prev) => prev - 1);
  } else {
    if (item.stock > quantity) {
      setCartItems((prev: itemType[]) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );

      setCartCount((prev) => prev + 1);
    }
  }
};

  const handleRemove = () => {
    setCartCount((prev: number) => prev - quantity);

      setCartItems((prev: itemType[]) =>
    prev.filter((cartItem) => cartItem.id !== item.id)
  );
  }

  const cardClicked = () => {
      setOpenCanvas(true)
  }

  return (
    <div className='cartcard'>
      <div>
        <div>
          <img src={item?.image} className='cartImage' onClick={() => cardClicked()}/>
        </div>
        <p>{item?.name}</p>
        <p>{item?.price}</p>
        stock: {item?.stock}
        {
          isAddedToCart ?
            <div className='incdec'>
              {quantity > 1 ? <button onClick={() => onIncre('dec')}>-</button> : <button onClick={() => handleRemove()}>Remove</button>}

              <p>{quantity}</p>
              <button onClick={() => onIncre('inc')}>+</button>
            </div>
            :
            <button onClick={() => updateCart()} style={{ width: "100%" }}>Add to cart</button>
        }
      </div>
    </div>
  )
}

export default ProductCard